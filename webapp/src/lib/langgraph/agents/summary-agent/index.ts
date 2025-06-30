import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { HumanMessage } from '@langchain/core/messages'
import type { IdeaRefinementState } from '../../state'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { working_model } from '../model'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const llm = new ChatGoogleGenerativeAI({
  model: working_model,
  temperature: 0.3,
})
const promptTemplate = fs.readFileSync(path.join(__dirname, 'prompt.md'), 'utf-8')
export const summaryAgentNode = async (state: IdeaRefinementState) => {
  const prompt = promptTemplate.replace(
    '{{history}}',
    state.messages.map((msg) => msg.content).join('\n\n---\n\n'),
  )

  const response = await llm.invoke([new HumanMessage(prompt)])
  return {
    report: response.content,
  }
}
