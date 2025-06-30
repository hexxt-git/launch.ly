import { BaseMessage } from '@langchain/core/messages'
export type IdeaRefinementState = {
  idea: string
  messages: { content: string }[]
  iteration?: number
  report?: string
  onAgentAction?: (agentName: string, message: string) => Promise<void>
}
