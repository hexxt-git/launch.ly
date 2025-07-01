import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getProjectAction, updateProjectAction } from '@/server-fns/projects'
import { GlassPanel } from '@/components/ui/glass-panel'
import { GlassCard } from '@/components/ui/glass-card'
import { GlassButton } from '@/components/ui/glass-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IdeaHeader } from '@/features/idea-generator/components/IdeaHeader'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

interface Project {
  id: string
  name: string
  description: string | null
}

export const Route = createFileRoute('/app/projects/$projectId/edit')({
  component: ProjectEditor,
})

function ProjectEditor() {
  const { projectId } = Route.useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectAction({ data: { projectId } })
        setProject(data)
        setName(data.name)
        setDescription(data.description || '')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project')
      }
    }

    fetchProject()
  }, [projectId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateProjectAction({
        data: {
          projectId,
          name,
          description,
        },
      })
      toast.success('Project updated successfully')
      navigate({ to: '/app/projects/$projectId', params: { projectId } })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update project')
    } finally {
      setIsLoading(false)
    }
  }

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
    <div className="space-y-6">
      <IdeaHeader title="Edit Project" subtitle="Update your project details" />

      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white">
              Project Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-white">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              className="w-full min-h-[200px]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <GlassButton
              type="button"
              variant="secondary"
              onClick={() => navigate({ to: '/app/projects/$projectId', params: { projectId } })}
            >
              Cancel
            </GlassButton>
            <GlassButton type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </GlassButton>
          </div>
        </form>
      </div>
    </div>
  )
}
