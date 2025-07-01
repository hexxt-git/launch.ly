import { GlassCard } from '@/components/ui/glass-card'
import { GlassBadge } from '@/components/ui'
import { GeneratedIdea, IdeaClientData } from '../types'
import { useDrag, useDrop } from 'react-dnd'
import { GripVertical, Heart, MessageSquare, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import { IdeaAnalytics } from './IdeaAnalytics'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useNavigate } from '@tanstack/react-router'
import { createProjectAction } from '@/server-fns/projects'
import { toast } from 'sonner'

interface DraggableIdeaCardProps {
  idea: GeneratedIdea
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  onUpdateClientData: (id: string, data: IdeaClientData) => void
}

export function DraggableIdeaCard({ idea, index, moveCard, onUpdateClientData }: DraggableIdeaCardProps) {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const [isNotesOpen, setIsNotesOpen] = useState(false)

  const [{ isDragging }, drag] = useDrag({
    type: 'IDEA_CARD',
    item: { id: idea.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'IDEA_CARD',
    hover(item: { id: string; index: number }, monitor) {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const toggleLike = () => {
    onUpdateClientData(idea.id, {
      ...idea.clientData,
      isLiked: !idea.clientData.isLiked,
    })
  }

  const handleSaveAsProject = async () => {
    try {
      const project = await createProjectAction({
        data: {
          name: idea.title,
          description: idea.description,
        },
      })
      toast.success('Project created successfully!', {
        description: 'Redirecting to project refinement...',
      })
      setTimeout(() => {
        navigate({ to: '/app/refine_idea/$projectId', params: { projectId: project.id } })
      }, 1000)
    } catch (error) {
      console.error('Error saving project:', error)
      toast.error('Failed to create project', {
        description: 'Please try again later.',
      })
    }
  }

  drag(drop(ref))

  return (
    <div ref={ref} className={cn('transition-opacity', isDragging && 'opacity-50')}>
      <GlassCard className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex justify-between items-start gap-2">
            <div className="cursor-move p-1 hover:bg-white/10 rounded-md transition-colors">
              <GripVertical className="size-5 text-white/60" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{idea.title}</h3>
              <div className="flex gap-2 mt-2">
                {idea.tags.map((tag) => (
                  <GlassBadge key={tag}>{tag}</GlassBadge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-blue-400"
                onClick={() => setIsNotesOpen(!isNotesOpen)}
              >
                <MessageSquare className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'hover:text-red-400 transition-colors',
                  idea.clientData.isLiked && 'text-red-400',
                )}
                onClick={toggleLike}
              >
                <Heart className="size-5" fill={idea.clientData.isLiked ? 'currentColor' : 'none'} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-green-400"
                onClick={handleSaveAsProject}
                title="Save as project"
              >
                <ArrowRight className="size-5" />
              </Button>
            </div>
          </div>

          {/* Description and Analytics */}
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <p className="text-muted-foreground line-clamp-3">{idea.description}</p>
            </div>
            <div className="border-l border-white/10 pl-4">
              <IdeaAnalytics analytics={idea.analytics} />
            </div>
          </div>

          {/* Notes */}
          {isNotesOpen && (
            <div className="mt-4">
              <textarea
                className="w-full h-24 p-3 rounded-lg bg-white/5 border border-white/10 text-white/90 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                placeholder="Add notes about this idea..."
                value={idea.clientData.notes}
                onChange={(e) =>
                  onUpdateClientData(idea.id, {
                    ...idea.clientData,
                    notes: e.target.value,
                  })
                }
              />
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  )
}
