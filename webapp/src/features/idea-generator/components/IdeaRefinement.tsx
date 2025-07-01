import { GlassCard } from '@/components/ui/glass-card'
import { GlassBadge } from '@/components/ui/glass-badge'
import { GlassButton } from '@/components/ui/glass-button'
import { IdeaHeader } from './IdeaHeader'
import { Button } from '@/components/ui/button'
import { RotateCcw, Save, Trash2, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import { AgentMessage } from './AgentMessage'
import { useIdeaRefinement } from '../hooks/useIdeaRefinement'
import { createProjectAction, updateProjectAction } from '@/server-fns/projects'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useProjects } from '@/features/navigation/ProjectsContext'

interface IdeaRefinementProps {
  projectId: string
  projectName: string
  projectDescription: string
}

export function IdeaRefinement({ projectId, projectName, projectDescription }: IdeaRefinementProps) {
  const navigate = useNavigate()
  const { invalidateProjects } = useProjects()
  const {
    refineIdea,
    messages,
    report,
    isLoading,
    error,
    reset,
    openMessageIndex,
    handleMessageClick,
    data,
  } = useIdeaRefinement()

  const hasStarted = messages.length > 0 || isLoading

  const handleStartRefinement = () => {
    refineIdea({ projectName, projectDescription })
  }

  const { mutate: saveProject, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      // Only proceed with refinement if we have a refined idea
      if (!data?.idea) {
        // If no refinement, use original values
        if (projectId) {
          return updateProjectAction({
            data: {
              projectId,
              name: projectName,
              description: projectDescription,
            },
          })
        } else {
          return createProjectAction({
            data: {
              name: projectName,
              description: projectDescription,
            },
          })
        }
      }

      // Parse the refined idea into name and description
      const refinedIdea = data.idea
      const [refinedName, ...descriptionParts] = refinedIdea.split('\n\n')
      const finalName = refinedName.replace('Project Name: ', '').trim()
      const finalDescription = descriptionParts.join('\n\n').replace('Project Description: ', '').trim()

      if (projectId) {
        return updateProjectAction({
          data: {
            projectId,
            name: finalName,
            description: finalDescription,
          },
        })
      } else {
        return createProjectAction({
          data: {
            name: finalName,
            description: finalDescription,
          },
        })
      }
    },
  })

  const handleSave = () => {
    saveProject(undefined, {
      onSuccess: () => {
        toast.success('Project saved successfully!')
        invalidateProjects()
      },
      onError: () => {
        toast.error('Failed to save project')
      },
    })
  }

  const handleGetStarted = () => {
    saveProject(undefined, {
      onSuccess: (project) => {
        invalidateProjects()
        navigate({
          to: '/app/projects/$projectId',
          params: { projectId: project.id },
        })
      },
      onError: () => {
        toast.error('Failed to save project')
      },
    })
  }

  return (
    <div className="space-y-4">
      <IdeaHeader
        title="Project Refinement"
        subtitle="Agents will discuss and refine your project idea"
        right={
          <Link
            to={projectId ? `/app/projects/$projectId` : '/app/tools/idea-generator'}
            params={projectId ? { projectId } : {}}
            className="contents"
          >
            <Button variant="ghost" size="icon" onClick={reset}>
              <RotateCcw className="size-6" />
            </Button>
          </Link>
        }
      />

      <h2 className="text-xl font-bold text-white mb-2">Original Idea</h2>
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white/80 mb-2">{projectName}</h3>
        <p className="text-white">{projectDescription}</p>
      </GlassCard>

      {!hasStarted && (
        <GlassButton
          size="sm"
          onClick={handleStartRefinement}
          disabled={isLoading}
          className="px-8 py-4"
          containerClassName="ms-auto w-fit"
        >
          Start Refinement Process
        </GlassButton>
      )}

      {error instanceof Error && (
        <GlassCard className="p-4 border-red-500/50 bg-red-500/10">
          <p className="text-red-300">Error: {error.message}</p>
        </GlassCard>
      )}

      {messages.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-white mb-2">Agent Collaboration</h2>
          <div className="space-y-4 pr-4">
            {messages.map((msg, index) => (
              <AgentMessage
                key={index}
                agentName={msg.agentName}
                message={msg.message}
                isLast={index === messages.length - 1}
                isOpen={openMessageIndex === index}
                onToggle={() => handleMessageClick(index)}
              />
            ))}
          </div>
        </>
      )}

      {report && (
        <>
          <h2 className="text-xl font-bold text-white mb-2">Final Report</h2>
          <div className="space-y-4">
            <GlassCard className="p-6">
              <div className="prose-sm prose-invert max-w-none">
                <ReactMarkdown>{report}</ReactMarkdown>
              </div>
            </GlassCard>
          </div>
        </>
      )}

      {data?.idea && (
        <>
          <h2 className="text-xl font-bold text-white mb-2">Refined Idea</h2>
          <GlassCard className="p-6">
            <div className="prose-sm prose-invert max-w-none">
              <ReactMarkdown>{data.idea}</ReactMarkdown>
            </div>
          </GlassCard>
        </>
      )}

      {isLoading && (
        <div className="text-center">
          <GlassBadge variant="info" size="lg">
            Agents are analyzing your project...
          </GlassBadge>
        </div>
      )}

      {hasStarted && !isLoading && (
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button variant="ghost" size="lg" onClick={reset} className="gap-2">
            <Trash2 className="size-5" />
            Discard
          </Button>
          <GlassButton
            size="lg"
            variant="secondary"
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2"
          >
            <Save className="size-5" />
            Save Project
          </GlassButton>
          <GlassButton size="lg" onClick={handleGetStarted} disabled={isSaving} className="gap-2">
            <ArrowRight className="size-5" />
            Get Started
          </GlassButton>
        </div>
      )}
    </div>
  )
}
