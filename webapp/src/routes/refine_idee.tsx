import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/refine_idee')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/refine_idee"!</div>
}
