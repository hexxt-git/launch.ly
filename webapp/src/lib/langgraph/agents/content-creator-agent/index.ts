import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { HumanMessage, AIMessage } from '@langchain/core/messages'
import type { IdeaRefinementState } from '../../state'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Import the model name from your central config file
import { working_model } from '../model'

// This is the modern, correct way to get the directory name in ES Modules.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize the LLM using the imported model name
const llm = new ChatGoogleGenerativeAI({
  model: working_model,
  temperature: 0.7,
})

// This line will now work correctly because __dirname is properly defined.
const promptTemplate = fs.readFileSync(path.join(__dirname, 'prompt.md'), 'utf-8')

// Extract the agent's name from its folder path for clear messaging.
const agentName = path
  .basename(__dirname)
  .replace(/-/g, ' ')
  .replace(/\b\w/g, (l) => l.toUpperCase())

export const agentNode = async (state: IdeaRefinementState) => {
  console.log(`content-creator-agent: Running agent. State: `, state)
  const prompt = promptTemplate
    .replace('{{idea}}', state.idea)
    .replace('{{history}}', state.messages.map((msg) => msg.content).join('\n'))

  console.log(`content-creator-agent: Prompt: `, prompt)
  const response = await llm.invoke([new HumanMessage(prompt)])

  console.log(`content-creator-agent: Response: `, response)
  return {
    messages: [new AIMessage({ content: `${agentName}: ${response.content}` })],
  }
}
