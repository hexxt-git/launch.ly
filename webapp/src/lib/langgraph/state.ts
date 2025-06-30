import { BaseMessage } from '@langchain/core/messages'
export interface IdeaRefinementState {
  idea: string
  messages: BaseMessage[]
  iteration: number
  report?: string
}
