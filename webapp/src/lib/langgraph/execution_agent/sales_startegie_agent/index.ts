import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { BaseMessage } from "@langchain/core/messages";
import { HumanMessage } from "@langchain/core/messages";
import { searchForLeadsTool, saveLeadsToDBTool } from "../../tools";
import { working_model } from "../../agents/model";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tools = [searchForLeadsTool, saveLeadsToDBTool];
const llmWithTools = new ChatGoogleGenerativeAI({
    model: working_model,
    temperature: 0,
}).bindTools(tools);
const promptTemplate = fs.readFileSync(path.join(__dirname, "prompt.md"), "utf-8");
export const salesStrategyAgentNode = async (state: { messages: BaseMessage[] }) => {
    const currentMessages = state.messages;
    const report = currentMessages[0].content as string;
    const conversation = [
        new HumanMessage(promptTemplate.replace("{{report}}", report)),
        ...currentMessages.slice(1)
    ];
    const response = await llmWithTools.invoke(conversation);

    return {
        messages: [response],
    };
};
