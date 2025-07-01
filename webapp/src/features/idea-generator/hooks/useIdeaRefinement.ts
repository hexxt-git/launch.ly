import { useMutation } from '@tanstack/react-query'
import { refineIdeaAction, type RefineIdeaResponse } from '@/server-fns/refine'
import { useState } from 'react'
import { AgentType } from '../constants/agents'

type Message = {
  agentName: AgentType
  message: string
}

// Helper function to parse AIMessage content and extract agent name and message
const parseAIMessage = (message: any): Message => {
  const content = message.kwargs?.content || ''
  // Extract agent name from the format "AgentName: message content"
  const match = content.match(/^([^:]+):\s*(.+)$/s)
  if (!match) {
    return { agentName: 'Unknown', message: content }
  }
  return {
    agentName: match[1] as AgentType,
    // The rest of the message after the agent name
    message: match[2].trim(),
  }
}

export function useIdeaRefinement() {
  const [openMessageIndex, setOpenMessageIndex] = useState<number | null>(null)

  const {
    mutate: refineIdea,
    data,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: async ({
      projectName,
      projectDescription,
    }: {
      projectName: string
      projectDescription: string
    }) => {
      const combinedIdea = `Project Name: ${projectName}\n\nProject Description: ${projectDescription}`
      const response = await refineIdeaAction({ data: { idea: combinedIdea } })
      if (!response.success && response.error) {
        throw new Error(response.error)
      }
      return response
    },
    onSuccess: () => {
      // Open the first message by default
      setOpenMessageIndex(0)
    },
    onError: () => {
      setOpenMessageIndex(null)
    },
  })

  const handleMessageClick = (index: number) => {
    setOpenMessageIndex(openMessageIndex === index ? null : index)
  }

  const messages = data?.messages.map(parseAIMessage) || []
  const report = data?.report || null

  return {
    refineIdea,
    messages,
    report,
    isLoading: isPending,
    error,
    reset,
    openMessageIndex,
    handleMessageClick,
  }
}
