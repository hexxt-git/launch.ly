import { IdeaHeader } from './IdeaHeader'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { GeneratedIdea, IdeaClientData } from '../types'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DraggableIdeaCard } from './DraggableIdeaCard'
import { useState, useCallback } from 'react'

interface ResultsStepProps {
  likedIdeas: GeneratedIdea[]
  onBack: () => void
  onReset: () => void
  onReorder?: (ideas: GeneratedIdea[]) => void
}

export function ResultsStep({ likedIdeas: initialLikedIdeas, onBack, onReset, onReorder }: ResultsStepProps) {
  const [likedIdeas, setLikedIdeas] = useState(
    initialLikedIdeas.map((idea) => ({
      ...idea,
      analytics: idea.analytics || {
        profitability: Math.floor(Math.random() * 40) + 60, // 60-100
        marketability: Math.floor(Math.random() * 40) + 60,
        feasibility: Math.floor(Math.random() * 40) + 60,
        innovation: Math.floor(Math.random() * 40) + 60,
        scalability: Math.floor(Math.random() * 40) + 60,
      },
      clientData: {
        ...(idea.clientData || { isLiked: false, notes: '' }),
      } as IdeaClientData,
    })),
  )

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setLikedIdeas((prevIdeas) => {
        const newIdeas = [...prevIdeas]
        const draggedIdea = newIdeas[dragIndex]
        newIdeas.splice(dragIndex, 1)
        newIdeas.splice(hoverIndex, 0, draggedIdea)

        if (onReorder) {
          onReorder(newIdeas)
        }

        return newIdeas
      })
    },
    [onReorder],
  )

  const updateClientData = useCallback((id: string, data: IdeaClientData) => {
    setLikedIdeas((prevIdeas) => {
      return prevIdeas.map((idea) => (idea.id === id ? { ...idea, clientData: data } : idea))
    })
  }, [])

  return (
    <div className="flex flex-col">
      <IdeaHeader
        title="Choose Ideas Worth Building"
        subtitle="Select one idea to turn it into a project"
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
      <DndProvider backend={HTML5Backend}>
        <div className="grid gap-6 w-full max-w-4xl">
          {likedIdeas.length === 0 ? (
            <div className="p-12">
              <p className="text-muted-foreground">You haven't liked any ideas yet.</p>
              <Button className="mt-4" onClick={onBack}>
                Go Back to Filtering
              </Button>
            </div>
          ) : (
            likedIdeas.map((idea, index) => (
              <DraggableIdeaCard
                key={idea.id}
                idea={idea}
                index={index}
                moveCard={moveCard}
                onUpdateClientData={updateClientData}
              />
            ))
          )}
        </div>
      </DndProvider>
    </div>
  )
}
