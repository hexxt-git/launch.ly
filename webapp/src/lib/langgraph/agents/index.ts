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

// Helper to get last N messages
const getLastNMessages = (messages: { content: string }[], n: number = 3) => {
  return messages
    .slice(-n)
    .map((msg) => msg.content)
    .join('\n')
}

// Create a factory function to generate agent nodes
const createAgentNode = (agentType: AgentType) => {
  const agentDir = path.join(__dirname, `${agentType}-agent`)
  const promptTemplate = fs.readFileSync(path.join(agentDir, 'prompt.md'), 'utf-8')

  const llm = new ChatGoogleGenerativeAI({
    model: working_model,
    temperature: 0.7,
    maxOutputTokens: 250, // Limit output tokens
  })

  const agentName = agentType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  return async (state: IdeaRefinementState) => {
    console.log(`${agentType}-agent: Running agent. State: `, state)

    // Only pass the last 3 messages of history to reduce token usage
    const recentHistory = getLastNMessages(state.messages, 3)

    const prompt =
      'IMPORTANT: Provide a very concise response in 2-3 lines maximum. Focus only on your specific expertise.\n\n' +
      promptTemplate.replace('{{idea}}', state.idea).replace('{{history}}', recentHistory)

    console.log(`${agentType}-agent: Prompt: `, prompt.slice(0, 50) + '...\n')
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
    maxOutputTokens: 500, // Limit summary output tokens
  })

  return async (state: IdeaRefinementState) => {
    // For summary, we need all messages but we'll format them more efficiently
    const formattedHistory = state.messages.map((msg) => msg.content.trim()).join('\n')

    const prompt =
      'Create a concise summary report. Keep each section to 2-3 lines maximum.\n\n' +
      promptTemplate.replace('{{history}}', formattedHistory)

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
