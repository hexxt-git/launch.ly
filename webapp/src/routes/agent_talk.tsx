import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: AgentTalk,
})
export function AgentTalk(){
  return <div className="min-h-screen flex flex-col">AgentTalk</div>
}
