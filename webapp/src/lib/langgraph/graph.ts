// @ts-nocheck
import { StateGraph, END } from '@langchain/langgraph'
import { IdeaRefinementState } from './state'
import {
  marketingAgentNode,
  brandAgentNode,
  softwareAgentNode,
  lawAgentNode,
  contentCreatorAgentNode,
  salesAgentNode,
  summaryAgentNode,
} from './agents'

const ideaWorkflow = new StateGraph<IdeaRefinementState>({
  channels: {
    idea: {
      value: (x, y) => y || x,
      default: () => '',
    },
    messages: {
      value: (x, y) => x.concat(y),
      default: () => [],
    },
    iteration: {
      value: (x, y) => x + 1,
      default: () => 0,
    },
    // Add a channel for our new report field
    report: {
      value: (x, y) => y,
      default: () => '',
    },
  },
})

// Add nodes
ideaWorkflow.addNode('marketing', marketingAgentNode)
ideaWorkflow.addNode('brand', brandAgentNode)
ideaWorkflow.addNode('software', softwareAgentNode)
ideaWorkflow.addNode('law', lawAgentNode)
ideaWorkflow.addNode('contentCreator', contentCreatorAgentNode)
ideaWorkflow.addNode('sales', salesAgentNode)
ideaWorkflow.addNode('summary', summaryAgentNode)

// Set entry point
ideaWorkflow.setEntryPoint('marketing')

// Add edges for the main flow
ideaWorkflow.addEdge('marketing', 'brand')
ideaWorkflow.addEdge('brand', 'software')
ideaWorkflow.addEdge('software', 'law')
ideaWorkflow.addEdge('law', 'contentCreator')
ideaWorkflow.addEdge('contentCreator', 'sales')
ideaWorkflow.addEdge('sales', 'summary')

// Add final edge to end
ideaWorkflow.addEdge('summary', END)

export const ideaRefinementApp = ideaWorkflow.compile()
