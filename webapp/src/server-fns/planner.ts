import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { GoogleGenAI, Type } from '@google/genai'
import { createServerFn } from '@tanstack/react-start'

// Schemas
const getPlannerDataSchema = z.object({
  projectId: z.string(),
})

const createColumnSchema = z.object({
  projectId: z.string(),
  title: z.string(),
  order: z.number().optional(),
})

const updateColumnSchema = z.object({
  columnId: z.string(),
  title: z.string().optional(),
  order: z.number().optional(),
})

const deleteColumnSchema = z.object({
  columnId: z.string(),
})

const createItemSchema = z.object({
  projectId: z.string(),
  columnId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  order: z.number().optional(),
})

const updateItemSchema = z.object({
  itemId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  columnId: z.string().optional(),
  order: z.number().optional(),
})

const deleteItemSchema = z.object({
  itemId: z.string(),
})

const generatePlannerTasksSchema = z.object({
  projectId: z.string(),
  projectDescription: z.string(),
  customPrompt: z.string().optional(),
})

// Server Functions
export const getPlannerData = createServerFn()
  .validator(getPlannerDataSchema)
  .handler(async ({ data }) => {
    const columns = await prisma.plannerColumn.findMany({
      where: { projectId: data.projectId },
      include: {
        items: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    })

    return columns
  })

export const createColumn = createServerFn()
  .validator(createColumnSchema)
  .handler(async ({ data }) => {
    const maxOrder = await prisma.plannerColumn.aggregate({
      where: { projectId: data.projectId },
      _max: { order: true },
    })

    const column = await prisma.plannerColumn.create({
      data: {
        projectId: data.projectId,
        title: data.title,
        order: data.order ?? (maxOrder._max.order ?? 0) + 1,
      },
      include: {
        items: {
          orderBy: { order: 'asc' },
        },
      },
    })

    return column
  })

export const updateColumn = createServerFn()
  .validator(updateColumnSchema)
  .handler(async ({ data }) => {
    const column = await prisma.plannerColumn.update({
      where: { id: data.columnId },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.order !== undefined && { order: data.order }),
      },
      include: {
        items: {
          orderBy: { order: 'asc' },
        },
      },
    })

    return column
  })

export const deleteColumn = createServerFn()
  .validator(deleteColumnSchema)
  .handler(async ({ data }) => {
    await prisma.plannerColumn.delete({
      where: { id: data.columnId },
    })

    return { success: true }
  })

export const createItem = createServerFn()
  .validator(createItemSchema)
  .handler(async ({ data }) => {
    const maxOrder = await prisma.plannerItem.aggregate({
      where: { columnId: data.columnId },
      _max: { order: true },
    })

    const item = await prisma.plannerItem.create({
      data: {
        projectId: data.projectId,
        columnId: data.columnId,
        title: data.title,
        description: data.description,
        order: data.order ?? (maxOrder._max.order ?? 0) + 1,
      },
    })

    return item
  })

export const updateItem = createServerFn()
  .validator(updateItemSchema)
  .handler(async ({ data }) => {
    const item = await prisma.plannerItem.update({
      where: { id: data.itemId },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.completed !== undefined && { completed: data.completed }),
        ...(data.columnId && { columnId: data.columnId }),
        ...(data.order !== undefined && { order: data.order }),
      },
    })

    return item
  })

export const deleteItem = createServerFn()
  .validator(deleteItemSchema)
  .handler(async ({ data }) => {
    await prisma.plannerItem.delete({
      where: { id: data.itemId },
    })

    return { success: true }
  })

export const generatePlannerTasks = createServerFn()
  .validator(generatePlannerTasksSchema)
  .handler(async ({ data }) => {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_API_KEY || '',
      })

      const config = {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            columns: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: 'Column title (e.g., Marketing, Development, Sales)',
                  },
                  tasks: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: {
                          type: Type.STRING,
                          description: 'Task title',
                        },
                        description: {
                          type: Type.STRING,
                          description: 'Task description',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }

      const prompt = `
Create a comprehensive project plan for the following project:

Project Description: ${data.projectDescription}

${data.customPrompt ? `Additional Requirements: ${data.customPrompt}` : ''}

Generate a Trello-style board with 4-6 columns representing different aspects of the project (e.g., Marketing, Development, Sales, Operations, Research, Testing).

For each column, create 3-5 specific, actionable tasks that would be needed to successfully execute this project.

Make sure the tasks are:
- Specific and actionable
- Realistic and achievable  
- Well-distributed across different project phases
- Include both strategic and tactical items

Return the data in the specified JSON format.
`
      console.log({ prompt })

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        config,
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      })

      console.log({ response })

      const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text
      if (!responseText) {
        throw new Error('Failed to get response from AI')
      }

      const parsed = JSON.parse(responseText)

      // Create columns and tasks in database
      for (let i = 0; i < parsed.columns.length; i++) {
        const columnData = parsed.columns[i]

        const column = await prisma.plannerColumn.create({
          data: {
            projectId: data.projectId,
            title: columnData.title,
            order: i,
          },
        })

        // Create tasks for this column
        for (let j = 0; j < columnData.tasks.length; j++) {
          const taskData = columnData.tasks[j]

          await prisma.plannerItem.create({
            data: {
              projectId: data.projectId,
              columnId: column.id,
              title: taskData.title,
              description: taskData.description,
              order: j,
            },
          })
        }
      }

      return { success: true, message: 'Planner tasks generated successfully' }
    } catch (error) {
      console.error('Error generating planner tasks:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  })
