import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { ideaRefinementApp } from '../lib/langgraph/graph'

const ideaSchema = z.object({
  idea: z.string().min(1, 'The idea cannot be empty.'),
})

// Helper to create a streaming response
function createStream() {
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const encoder = new TextEncoder()

  return {
    stream: stream.readable,
    write: async (data: any) => {
      await writer.write(encoder.encode(JSON.stringify(data) + '\n'))
    },
    close: () => writer.close(),
  }
}

export const refineIdeaAction = createServerFn({
  method: 'POST',
  response: 'raw', // Use raw response mode for streaming
})
  .validator(ideaSchema)
  .handler(async ({ data }) => {
    console.log('✅ Server Function: Received idea:', data.idea)

    const { stream, write, close } = createStream()

    // Start processing in the background
    ;(async () => {
      try {
        console.log('🚀 Server Function: Invoking the AI agent workflow...')
        const finalState = await ideaRefinementApp.invoke(
          {
            idea: data.idea,
            messages: [],
            onAgentAction: async (agentName: string, message: string) => {
              await write({ type: 'agent_message', agentName, message })
            },
          },
          {
            recursionLimit: 100,
          },
        )

        // Send final state
        await write({ type: 'complete', data: finalState })
        console.log('✅ Server Function: AI workflow complete.')
      } catch (error) {
        console.error('❌ Server Function: Error during LangGraph invocation:', error)
        await write({
          type: 'error',
          message: 'Failed to refine the idea due to a server error.',
        })
      } finally {
        await close()
      }
    })()

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  })
