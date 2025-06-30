import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  Navigate({ to: '/app/tools/idea-generator' })
  return null
}
