import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getProjectAction } from '@/server-fns/projects'
import { PlannerBoard } from '@/features/planner'
import { GlassPanel } from '@/components/ui/glass-panel'

interface Project {
  id: string
  name: string
  description: string | null
}

export const Route = createFileRoute('/app/projects/$projectId/planner')({
  component: PlannerComponent,
})

function PlannerComponent() {
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
    <PlannerBoard
      projectId={projectId}
      projectName={project.name}
      projectDescription={project.description || undefined}
    />
  )
}
