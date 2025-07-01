import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getProjectAction } from '@/server-fns/projects'
import { GlassPanel } from '@/components/ui/glass-panel'
import { GlassCard } from '@/components/ui/glass-card'
import { IdeaHeader } from '@/features/idea-generator/components/IdeaHeader'
import { GlassButton } from '@/components/ui/glass-button'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Calendar, Flag, ListTodo } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string | null
}

interface Task {
  id: string
  title: string
  completed: boolean
}

interface Milestone {
  id: string
  title: string
  dueDate: string
  status: 'pending' | 'completed' | 'overdue'
}

export const Route = createFileRoute('/app/projects/$projectId/planner')({
  component: PlannerComponent,
})

function PlannerComponent() {
  const { projectId } = Route.useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Example data - in a real app, this would come from your backend
  const [tasks] = useState<Task[]>([
    { id: '1', title: 'Define project scope', completed: false },
    { id: '2', title: 'Create project timeline', completed: false },
    { id: '3', title: 'Identify key stakeholders', completed: true },
  ])

  const [milestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Project Kickoff',
      dueDate: '2024-03-20',
      status: 'completed',
    },
    {
      id: '2',
      title: 'First Prototype',
      dueDate: '2024-04-15',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Beta Release',
      dueDate: '2024-05-01',
      status: 'pending',
    },
  ])

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
    <div className="space-y-6">
      <IdeaHeader
        title={project.name}
        subtitle="Plan and track your project progress"
        right={
          <GlassButton size="sm" className="gap-2">
            <Plus className="size-4" />
            Add Task
          </GlassButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks Section */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ListTodo className="size-5 text-white/80" />
            <h2 className="text-xl font-semibold text-white">Tasks</h2>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3">
                <Checkbox checked={task.completed} />
                <span className={task.completed ? 'line-through text-white/50' : 'text-white'}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Milestones Section */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Flag className="size-5 text-white/80" />
            <h2 className="text-xl font-semibold text-white">Milestones</h2>
          </div>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center gap-3">
                <Calendar className="size-4 text-white/60" />
                <div className="flex-1">
                  <div className="text-white">{milestone.title}</div>
                  <div className="text-sm text-white/60">Due: {milestone.dueDate}</div>
                </div>
                <div
                  className={`text-sm px-2 py-1 rounded ${
                    milestone.status === 'completed'
                      ? 'bg-green-500/20 text-green-300'
                      : milestone.status === 'overdue'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}
                >
                  {milestone.status}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Project Description */}
        <GlassCard className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Project Overview</h2>
          <p className="text-white/80">{project.description}</p>
        </GlassCard>
      </div>
    </div>
  )
}
