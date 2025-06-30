import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { ideaRefinementApp } from '../lib/langgraph/graph'

const ideaSchema = z.object({
  idea: z.string().min(1, 'The idea cannot be empty.'),
})
export const refineIdeaAction = createServerFn({
  method: 'POST',
})
  .validator(ideaSchema)
  .handler(async ({ data }) => {
    console.log('✅ Server Function: Received idea:', data.idea)
    try {
      console.log('🚀 Server Function: Invoking the AI agent workflow...')
      const finalState = await ideaRefinementApp.invoke({
        idea: data.idea,
        messages: [],
      })

      console.log('✅ Server Function: AI workflow complete. Returning result.')
      return finalState
    } catch (error) {
      console.error('❌ Server Function: Error during LangGraph invocation:', error)
      throw new Error('Failed to refine the idea due to a server error.')
    }
  })
