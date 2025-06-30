import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/agent_talk')({
  component: AgentTalk,
})
export function AgentTalk(){
  return <div className="min-h-screen flex flex-col">AgentTalk</div>
}
