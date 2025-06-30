import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { HumanMessage, AIMessage } from '@langchain/core/messages'
import type { IdeaRefinementState } from '../state'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { working_model } from './model'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define all available agents
const AGENTS = ['brand', 'content-creator', 'law', 'marketing', 'sales', 'software'] as const

type AgentType = (typeof AGENTS)[number]

// Create a factory function to generate agent nodes
const createAgentNode = (agentType: AgentType) => {
  const agentDir = path.join(__dirname, `${agentType}-agent`)
  const promptTemplate = fs.readFileSync(path.join(agentDir, 'prompt.md'), 'utf-8')

  const llm = new ChatGoogleGenerativeAI({
    model: working_model,
    temperature: 0.7,
  })

  const agentName = agentType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  return async (state: IdeaRefinementState) => {
    console.log(`${agentType}-agent: Running agent. State: `, state)
    const prompt =
      'IMPORTANT: Provide a very concise response in 3-5 lines maximum.\n\n' +
      promptTemplate
        .replace('{{idea}}', state.idea)
        .replace('{{history}}', state.messages.map((msg) => msg.content).join('\n'))

    console.log(`${agentType}-agent: Prompt: `, prompt)
    const response = await llm.invoke([new HumanMessage(prompt)])
    const content = response.content.toString()

    // Call onAgentAction if available
    if (state.onAgentAction) {
      await state.onAgentAction(agentName, content)
    }

    console.log(`${agentType}-agent: Response: `, response)
    return {
      messages: [new AIMessage({ content: `${agentName}: ${content}` })],
    }
  }
}

// Create the summary agent separately since it has a different return type
const createSummaryNode = () => {
  const agentDir = path.join(__dirname, 'summary-agent')
  const promptTemplate = fs.readFileSync(path.join(agentDir, 'prompt.md'), 'utf-8')

  const llm = new ChatGoogleGenerativeAI({
    model: working_model,
    temperature: 0.6,
  })

  return async (state: IdeaRefinementState) => {
    const prompt =
      promptTemplate.replace('{{history}}', state.messages.map((msg) => msg.content).join('\n\n---\n\n')) +
      '\n\nIMPORTANT: Keep each section to 2-3 lines maximum.'

    const response = await llm.invoke([new HumanMessage(prompt)])
    return {
      report: response.content,
    }
  }
}

// Export all agent nodes
export const brandAgentNode = createAgentNode('brand')
export const contentCreatorAgentNode = createAgentNode('content-creator')
export const lawAgentNode = createAgentNode('law')
export const marketingAgentNode = createAgentNode('marketing')
export const salesAgentNode = createAgentNode('sales')
export const softwareAgentNode = createAgentNode('software')
export const summaryAgentNode = createSummaryNode()
