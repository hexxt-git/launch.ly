import { createFileRoute } from '@tanstack/react-router'
import { IdeaGenerator } from '@/features/idea-generator/components/IdeaGenerator'

export const Route = createFileRoute('/app/tools/idea-generator')({
  component: RouteComponent,
})

function RouteComponent() {
  return <IdeaGenerator />
}
