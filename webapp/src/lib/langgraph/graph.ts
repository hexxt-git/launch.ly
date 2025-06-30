import { StateGraph, END } from "@langchain/langgraph";
import { IdeaRefinementState } from "./state";
import { agentNode as marketingAgentNode } from "./agents/marketing-agent";
import { agentNode as brandAgentNode } from "./agents/brand-agent";
import { agentNode as softwareAgentNode } from "./agents/software-agent";
import { agentNode as lawAgentNode } from "./agents/law-agent";
import { agentNode as contentCreatorAgentNode } from "./agents/content-creator-agent";
import { agentNode as salesAgentNode } from "./agents/sales-agent";

const MAX_ITERATIONS = 1; 

const shouldContinue = (state: IdeaRefinementState) => {
  if (state.iteration >= 6) { 
    return "end";
  }
  return "continue";
};

const ideaWorkflow = new StateGraph<IdeaRefinementState>({
  channels: {
    idea: {
      value: (x, y) => y,
      default: () => "",
    },
    messages: {
      value: (x, y) => x.concat(y),
      default: () => [],
    },
    iteration: {
        value: (x, y) => x + 1,
        default: () => 0
    }
  },
});

ideaWorkflow.addNode("marketing", marketingAgentNode);
ideaWorkflow.addNode("brand", brandAgentNode);
ideaWorkflow.addNode("software", softwareAgentNode);
ideaWorkflow.addNode("law", lawAgentNode);
ideaWorkflow.addNode("contentCreator", contentCreatorAgentNode);
ideaWorkflow.addNode("sales", salesAgentNode);

ideaWorkflow.addEdge("marketing", "brand");
ideaWorkflow.addEdge("brand", "software");
ideaWorkflow.addEdge("software", "law");
ideaWorkflow.addEdge("law", "contentCreator");
ideaWorkflow.addEdge("contentCreator", "sales");
ideaWorkflow.addEdge("sales", END);

ideaWorkflow.setEntryPoint("marketing");


export const ideaRefinementApp = ideaWorkflow.compile();