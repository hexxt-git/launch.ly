import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getProjectAction } from '@/server-fns/projects'
import { GlassPanel } from '@/components/ui/glass-panel'
import { GlassCard } from '@/components/ui/glass-card'
import { GlassButton } from '@/components/ui/glass-button'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ListTodo } from 'lucide-react'
import { IdeaHeader } from '@/features/idea-generator/components/IdeaHeader'
import Markdown from 'react-markdown'

interface Project {
  id: string
  name: string
  description: string | null
}

export const Route = createFileRoute('/app/projects/$projectId/')({
  component: ProjectReader,
})

function ProjectReader() {
  const { projectId } = Route.useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectAction({ data: { projectId } })
        setProject(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project')
      }
    }

    fetchProject()
  }, [projectId])

  if (!project) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <GlassPanel className="max-w-4xl">
          <div className="text-center">
            {error ? (
              <p className="text-red-300">Error: {error}</p>
            ) : (
              <p className="text-white/60">Loading project...</p>
            )}
          </div>
        </GlassPanel>
      </div>
    )
  }

  return (
    <div>
      <IdeaHeader
        title={project.name}
        subtitle="View and edit your idea"
        right={
          <>
            <Link to="/app/projects/$projectId/planner" params={{ projectId: project.id }}>
              <GlassButton size="sm" className="gap-2 me-2">
                <ListTodo className="size-4" />
                Project Planner
              </GlassButton>
            </Link>
            <Link to="/app/projects/$projectId/refine_idea" params={{ projectId: project.id }}>
              <GlassButton size="sm" className="gap-2">
                <ArrowRight className="size-4" />
                Refine Idea
              </GlassButton>
            </Link>
          </>
        }
      ></IdeaHeader>

      <GlassCard className="p-6">
        <div className="prose-sm prose-invert max-w-none">
          <Markdown>{project.description}</Markdown>
        </div>
      </GlassCard>
    </div>
  )
}
