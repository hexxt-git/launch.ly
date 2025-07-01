import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { ideaRefinementApp } from '../lib/langgraph/graph'

const ideaSchema = z.object({
  idea: z.string().min(1, 'The idea cannot be empty.'),
})

export type RefineIdeaResponse = {
  success: boolean
  messages: any[]
  report: string | null
  idea: string
  error?: string
}

export const refineIdeaAction = createServerFn()
  .validator(ideaSchema)
  .handler(async ({ data }): Promise<RefineIdeaResponse> => {
    try {
      const finalState = await ideaRefinementApp.invoke(
        {
          idea: data.idea,
          messages: [],
          onAgentAction: async (agentName: string, message: string) => {
            console.log(`🗣️ [${agentName}] Processing message:`, {
              timestamp: new Date().toISOString(),
              length: message.length,
              preview: message.slice(0, 100) + '...',
            })
          },
        },
        {
          recursionLimit: 100,
        },
      )

      return {
        success: true,
        messages: finalState.messages,
        report: finalState.report,
        idea: finalState.idea,
      }
    } catch (error) {
      console.error('💥 Server Function: Error details:', {
        name: error instanceof Error ? error.name : 'Unknown Error',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      })
      console.error('❌ Server Function: Error during LangGraph invocation:', error)
      return {
        success: false,
        messages: [],
        report: null,
        idea: '',
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }
    }
  })
