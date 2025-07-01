import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getProjectAction } from '@/server-fns/projects'
import { GlassPanel } from '@/components/ui/glass-panel'
import { IdeaRefinement } from '@/features/idea-generator/components/IdeaRefinement'

interface Project {
  id: string
  name: string
  description: string | null
}

export const Route = createFileRoute('/app/projects/$projectId/refine_idea')({
  component: RefineIdeaComponent,
})

function RefineIdeaComponent() {
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

  if (!project.name || !project.description) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <GlassPanel className="max-w-4xl">
          <div className="text-center">
            <p className="text-red-300">
              This project is missing required information (name or description).
            </p>
          </div>
        </GlassPanel>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <IdeaRefinement
        projectId={project.id}
        projectName={project.name}
        projectDescription={project.description}
      />
    </div>
  )
}
