import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { GoogleGenAI, Type } from '@google/genai'

const generateIdeasSchema = z.object({
  problems: z.array(z.string()),
  technologies: z.array(z.string()),
  targetAudiences: z.array(z.string()),
  themes: z.array(z.string()),
  settings: z.object({
    profitability: z.enum(['low', 'medium', 'high']),
    novelty: z.enum(['familiar', 'fresh', 'revolutionary']),
    feasibility: z.enum(['ambitious', 'realistic', 'practical']),
  }),
  instruction: z.string(),
})

export type GeneratedIdeaResponse = {
  id: string
  title: string
  description: string
  tags: string[]
  analytics: {
    profitability: number
    marketability: number
    feasibility: number
    innovation: number
    scalability: number
  }
}

export type GenerateIdeasResponse = {
  success: boolean
  ideas: GeneratedIdeaResponse[]
  error?: string
  partialSuccess?: boolean
}

// Helper function to make a single API call for 3 ideas
async function generateBatchOfIdeas(
  ai: GoogleGenAI,
  data: z.infer<typeof generateIdeasSchema>,
  batchNumber: number,
): Promise<GeneratedIdeaResponse[]> {
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        ideas: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: {
                type: Type.STRING,
                description: 'Unique identifier for the idea',
              },
              title: {
                type: Type.STRING,
                description: 'Catchy and descriptive title for the project idea',
              },
              description: {
                type: Type.STRING,
                description: 'Detailed description of the project idea (2-3 paragraphs)',
              },
              tags: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: 'Relevant tags that describe the project',
              },
              analytics: {
                type: Type.OBJECT,
                properties: {
                  profitability: {
                    type: Type.NUMBER,
                    description: 'Profitability score from 0-100',
                  },
                  marketability: {
                    type: Type.NUMBER,
                    description: 'Marketability score from 0-100',
                  },
                  feasibility: {
                    type: Type.NUMBER,
                    description: 'Feasibility score from 0-100',
                  },
                  innovation: {
                    type: Type.NUMBER,
                    description: 'Innovation score from 0-100',
                  },
                  scalability: {
                    type: Type.NUMBER,
                    description: 'Scalability score from 0-100',
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
Generate 3 innovative project ideas (batch ${batchNumber}) based on the following criteria:

Problems to solve: ${data.problems.join(', ') || 'Any relevant problems'}

Technologies to use: ${data.technologies.join(', ') || 'Any suitable technologies'}

Target audiences: ${data.targetAudiences.join(', ') || 'General audience'}

Themes: ${data.themes.join(', ') || 'Any relevant themes'}

Settings:
- Profitability preference: ${data.settings.profitability}
- Novelty preference: ${data.settings.novelty}
- Feasibility preference: ${data.settings.feasibility}

Additional instructions: ${data.instruction}

For each idea, provide:
1. A unique ID (use format: idea-${batchNumber}-1, idea-${batchNumber}-2, idea-${batchNumber}-3)
2. A compelling title
3. A detailed description (3-5 lines) that explains what the project does, how it works, and why it's valuable
4. Relevant tags that describe the project
5. Analytics scores (0-100) for profitability, marketability, feasibility, innovation, and scalability

Make sure the ideas are diverse, practical, and aligned with the specified preferences. Try to be creative and different from other common project ideas.
`

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ]

  console.log(`Making API call for batch ${batchNumber}`)

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    config,
    contents,
  })

  const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text
  if (!responseText) {
    throw new Error(`Failed to get response from Gemini for batch ${batchNumber}`)
  }

  const parsed = JSON.parse(responseText)
  return parsed.ideas
}

export const generateIdeasAction = createServerFn()
  .validator(generateIdeasSchema)
  .handler(async ({ data }): Promise<GenerateIdeasResponse> => {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY || '',
    })

    const allIdeas: GeneratedIdeaResponse[] = []
    const errors: string[] = []
    let successfulBatches = 0

    // Make three parallel API calls, each generating 3 ideas
    const batchPromises = [1, 2, 3].map((batchNumber) =>
      generateBatchOfIdeas(ai, data, batchNumber)
        .then((batchIdeas) => ({ success: true as const, batchNumber, ideas: batchIdeas }))
        .catch((error) => ({
          success: false as const,
          batchNumber,
          error: error instanceof Error ? error.message : `Unknown error in batch ${batchNumber}`,
        })),
    )

    const results = await Promise.all(batchPromises)

    // Process results
    for (const result of results) {
      if (result.success) {
        allIdeas.push(...result.ideas)
        successfulBatches++
        console.log(`Batch ${result.batchNumber} completed successfully with ${result.ideas.length} ideas`)
      } else {
        console.error(`💥 Batch ${result.batchNumber} failed:`, result.error)
        errors.push(`Batch ${result.batchNumber}: ${result.error}`)
      }
    }

    // Determine the response based on results
    if (allIdeas.length === 0) {
      return {
        success: false,
        ideas: [],
        error: `All batches failed. Errors: ${errors.join('; ')}`,
      }
    }

    const isPartialSuccess = successfulBatches < 3
    const response: GenerateIdeasResponse = {
      success: true,
      ideas: allIdeas,
      partialSuccess: isPartialSuccess,
    }

    if (isPartialSuccess) {
      response.error = `Some batches failed (${successfulBatches}/3 succeeded). Errors: ${errors.join('; ')}`
      console.log(
        `Partial success: ${successfulBatches}/3 batches succeeded, returning ${allIdeas.length} ideas`,
      )
    } else {
      console.log(`Full success: All 3 batches succeeded, returning ${allIdeas.length} ideas`)
    }

    return response
  })
