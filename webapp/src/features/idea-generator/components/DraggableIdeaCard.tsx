import { GlassCard } from '@/components/ui/glass-card'
import { GlassBadge } from '@/components/ui'
import { GeneratedIdea, IdeaClientData } from '../types'
import { useDrag, useDrop } from 'react-dnd'
import { GripVertical, Heart, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import { IdeaAnalytics } from './IdeaAnalytics'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface DraggableIdeaCardProps {
  idea: GeneratedIdea
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  onUpdateClientData?: (id: string, data: IdeaClientData) => void
}

export function DraggableIdeaCard({ idea, index, moveCard, onUpdateClientData }: DraggableIdeaCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isNotesOpen, setIsNotesOpen] = useState(false)

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'idea-card',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'idea-card',
    hover: (item: { index: number }) => {
      if (item.index === index) return
      moveCard(item.index, index)
      item.index = index
    },
  })

  // Combine the refs
  drag(ref)
  drop(ref)

  const toggleLike = () => {
    if (onUpdateClientData) {
      onUpdateClientData(idea.id, {
        ...idea.clientData,
        isLiked: !idea.clientData.isLiked,
      })
    }
  }

  const updateNotes = (notes: string) => {
    if (onUpdateClientData) {
      onUpdateClientData(idea.id, {
        ...idea.clientData,
        notes,
      })
    }
  }

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
            <div className="mt-2">
              <Textarea
                placeholder="Add your notes here..."
                value={idea.clientData.notes}
                onChange={(e) => updateNotes(e.target.value)}
                className="min-h-[100px] bg-white/5"
              />
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  )
}
