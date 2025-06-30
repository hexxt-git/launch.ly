import { IdeaHeader } from './IdeaHeader'
import { IdeaCard } from './IdeaCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { GeneratedIdea } from '../types'

interface FilteringStepProps {
  ideas: GeneratedIdea[]
  currentIndex: number
  onLike: () => void
  onReject: () => void
  onBack: () => void
}

export function FilteringStep({ ideas, currentIndex, onLike, onReject, onBack }: FilteringStepProps) {
  return (
    <div className="flex flex-col">
      <IdeaHeader
        title="Choose Ideas Worth Building"
        subtitle="filter out the ideas you don't like"
        left={
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="size-6" />
          </Button>
        }
      />
      <div className="w-full text-sm text-muted-foreground mb-2">
        <span className="font-medium">
          {currentIndex + 1}/{ideas.length}
        </span>
      </div>
      {currentIndex < ideas.length && (
        <IdeaCard
          idea={ideas[currentIndex]}
          onLike={onLike}
          onReject={onReject}
          currentIndex={currentIndex}
          total={ideas.length}
        />
      )}
    </div>
  )
}
