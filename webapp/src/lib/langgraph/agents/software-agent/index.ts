import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import type { IdeaRefinementState } from "../../state";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { working_model } from "../model";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const llm = new ChatGoogleGenerativeAI({
  model: working_model,
  temperature: 0.7,
});

const promptTemplate = fs.readFileSync(
  path.join(__dirname, "prompt.md"),
  "utf-8"
);

const agentName = path.basename(__dirname).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

export const agentNode = async (state: IdeaRefinementState) => {
  const prompt = promptTemplate
    .replace("{{idea}}", state.idea)
    .replace(
      "{{history}}",
      state.messages.map((msg) => msg.content).join("\n")
    );

  const response = await llm.invoke([new HumanMessage(prompt)]);

  return {
    messages: [new AIMessage({ content: `${agentName}: ${response.content}` })],
  };
};
