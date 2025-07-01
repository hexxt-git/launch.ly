import { createFileRoute, Link } from '@tanstack/react-router'
import { GlassButton, GlassCard } from '@/components/ui'
import { useProjects } from '@/features/navigation/ProjectsContext'

export const Route = createFileRoute('/app/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { projects } = useProjects()

  return (
    <div className="flex gap-2 flex-wrap">
      {projects.map((project) => (
        <Link to="/app/projects/$projectId" params={{ projectId: project.id }} className="contents">
          <GlassCard className="min-h-32 p-4" wrapperClassName="max-w-1/3">
            {project.name}
            <p className="text-sm text-muted-foreground line-clamp-4">{project.description}</p>
          </GlassCard>
        </Link>
      ))}
    </div>
  )
}
