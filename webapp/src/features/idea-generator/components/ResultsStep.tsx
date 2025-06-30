import { IdeaHeader } from './IdeaHeader'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { GeneratedIdea } from '../types'

interface ResultsStepProps {
  likedIdeas: GeneratedIdea[]
  onBack: () => void
  onReset: () => void
}

export function ResultsStep({ likedIdeas, onBack, onReset }: ResultsStepProps) {
  return (
    <div className="flex flex-col">
      <IdeaHeader
        title="Your Selected Ideas"
        right={
          <>
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button variant="ghost" onClick={onReset}>
              Start Over
            </Button>
          </>
        }
      />
      <div className="grid gap-6 w-full max-w-4xl">
        {likedIdeas.length === 0 ? (
          <div className="p-12">
            <p className="text-muted-foreground">You haven't liked any ideas yet.</p>
            <Button className="mt-4" onClick={onBack}>
              Go Back to Filtering
            </Button>
          </div>
        ) : (
          likedIdeas.map((idea) => (
            <GlassCard key={idea.id} className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{idea.title}</h3>
                <div className="flex gap-2">
                  {idea.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-muted-foreground line-clamp-3">{idea.description}</p>
              <Button variant="ghost" className="mt-2 p-0 h-auto text-sm text-primary">
                View Details
              </Button>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  )
}
