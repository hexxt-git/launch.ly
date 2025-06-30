import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="h-[2000px]">Hello "/app/"!</div>
}
