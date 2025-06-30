import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { Heart, X } from 'lucide-react'
import { GeneratedIdea } from '../types'
import { Button } from '@/components/ui/button'

interface IdeaCardProps {
  idea: GeneratedIdea
  onLike: () => void
  onReject: () => void
  currentIndex: number
  total: number
}

export function IdeaCard({ idea, onLike, onReject, currentIndex, total }: IdeaCardProps) {
  return (
    <GlassCard className="p-6 h-[500px] flex flex-col border-2">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">{idea.title}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground">{idea.description}</p>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full h-16 w-16 p-0 border-red-500/50 hover:bg-red-500/10 hover:text-red-500"
          onClick={onReject}
        >
          <X className="h-8 w-8" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full h-16 w-16 p-0 border-green-500/50 hover:bg-green-500/10 hover:text-green-500"
          onClick={onLike}
        >
          <Heart className="h-8 w-8" />
        </Button>
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        {currentIndex + 1} of {total}
      </div>
    </GlassCard>
  )
}
