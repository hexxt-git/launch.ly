import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const projectParamsSchema = z.object({
  projectId: z.string(),
})

const createProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

const updateProjectSchema = z.object({
  projectId: z.string(),
  name: z.string(),
  description: z.string().optional(),
})

export const getAllProjectsAction = createServerFn({
  method: 'GET',
}).handler(async () => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        updatedAt: true,
      },
    })

    return projects
  } catch (error) {
    console.error(' Error fetching projects:', error)
    throw error
  }
})

export const createProjectAction = createServerFn({
  method: 'POST',
})
  .validator(createProjectSchema)
  .handler(async ({ data: { name, description } }) => {
    console.log('📝 Creating new project:', { name, description })

    try {
      const project = await prisma.project.create({
        data: {
          name,
          description,
        },
      })

      console.log(' Project created:', project)
      return project
    } catch (error) {
      console.error(' Error creating project:', error)
      throw error
    }
  })

export const updateProjectAction = createServerFn({
  method: 'POST',
})
  .validator(updateProjectSchema)
  .handler(async ({ data: { projectId, name, description } }) => {
    console.log('📝 Updating project:', { projectId, name, description })

    try {
      const project = await prisma.project.update({
        where: { id: projectId },
        data: {
          name,
          description,
        },
      })

      console.log(' Project updated:', project)
      return project
    } catch (error) {
      console.error(' Error updating project:', error)
      throw error
    }
  })

export const getProjectAction = createServerFn({
  method: 'GET',
})
  .validator(projectParamsSchema)
  .handler(async ({ data: { projectId } }) => {
    try {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: {
          id: true,
          name: true,
          description: true,
        },
      })

      if (!project) {
        console.error(' Project not found:', projectId)
        throw new Error('Project not found')
      }

      return project
    } catch (error) {
      console.error(' Error fetching project:', error)
      throw error
    }
  })
