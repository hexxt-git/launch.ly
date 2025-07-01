// src/lib/langgraph/salesStrategyGraph.ts

import { StateGraph, END } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import type { BaseMessage } from "@langchain/core/messages";
import { salesStrategyAgentNode } from "./execution_agent/sales_startegie_agent";
import { searchForLeadsTool, saveLeadsToDBTool } from "./tools";

export interface SalesStrategyState {
  messages: BaseMessage[];
}

const tools = [searchForLeadsTool, saveLeadsToDBTool];
const toolNode = new ToolNode(tools);


const shouldContinue = (state: SalesStrategyState) => {
  const lastMessage = state.messages[state.messages.length - 1];

  if ("tool_calls" in lastMessage && lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
    return "use_tools";
  }
  return "end";
};
const salesWorkflow = new StateGraph<SalesStrategyState>({
  channels: {
    messages: {

      value: (x, y) => x.concat(y),
      default: () => [],
    },
  },
});

salesWorkflow.addNode("agent", salesStrategyAgentNode);
salesWorkflow.addNode("tools", toolNode);
salesWorkflow.setEntryPoint("agent");
salesWorkflow.addConditionalEdges(
  "agent",     
  shouldContinue,
  {
    use_tools: "tools", 
    end: END,         
  }
);


salesWorkflow.addEdge("tools", "agent");

export const salesStrategyApp = salesWorkflow.compile();
