import { IdeaHeader } from './IdeaHeader'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, X } from 'lucide-react'
import { GeneratedIdea } from '../types'
import { useSpring, animated } from 'react-spring'
import { useDrag } from '@use-gesture/react'
import { GlassBadge } from '@/components/ui'
import React from 'react'

interface FilteringStepProps {
  ideas: GeneratedIdea[]
  currentIndex: number
  onLike: () => void
  onReject: () => void
  onBack: () => void
}

const SWIPE_THRESHOLD = 100 // px to trigger swipe action
const MAX_ROTATION = 30 // degrees
const SWIPE_OUT_DURATION = 200 // ms

export function FilteringStep({ ideas, currentIndex, onLike, onReject, onBack }: FilteringStepProps) {
  const currentIdea = ideas[currentIndex]
  const [{ x, y, rotation, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    config: { tension: 500, friction: 30 },
  }))

  const bind = useDrag(({ down, movement: [mx], velocity: [vx], direction: [xDir] }) => {
    const swipe = Math.abs(mx) > SWIPE_THRESHOLD
    const dir = xDir < 0 ? -1 : 1

    if (!down && swipe) {
      // Swipe out animation
      api.start({
        x: dir * window.innerWidth * 1.5,
        rotation: dir * MAX_ROTATION,
        config: { duration: SWIPE_OUT_DURATION },
      })

      // Trigger action after animation
      setTimeout(() => {
        if (dir > 0) onLike()
        else onReject()
      }, SWIPE_OUT_DURATION)

      return
    }

    // Interactive movement
    api.start({
      x: down ? mx : 0,
      rotation: down ? (mx / window.innerWidth) * MAX_ROTATION : 0,
      scale: down ? 1.05 : 1,
      immediate: down,
      config: { tension: down ? 800 : 500, friction: 30 },
    })
  })

  if (!currentIdea) return null

  return (
    <>
      <IdeaHeader
        title="Choose Ideas Worth Building"
        subtitle="Swipe right to like, left to reject"
        left={
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="size-6" />
          </Button>
        }
      />

      <div className="relative w-full max-w-xl mx-auto mt-8 pb-12">
        {/* Card Container */}
        <animated.div
          {...bind()}
          style={{
            x,
            y,
            rotateZ: rotation,
            scale,
            touchAction: 'none',
          }}
          className="relative"
          key={currentIdea.id}
        >
          {/* Swipe Indicators */}
          <animated.div
            className="absolute top-4 right-4 text-red-500 text-2xl font-bold z-10"
            style={{
              opacity: x.to((x) => (x < 0 ? Math.min(Math.abs(x) / SWIPE_THRESHOLD, 1) : 0)),
            }}
          >
            NOPE
          </animated.div>
          <animated.div
            className="absolute top-4 left-4 text-green-500 text-2xl font-bold z-10"
            style={{
              opacity: x.to((x) => (x > 0 ? Math.min(x / SWIPE_THRESHOLD, 1) : 0)),
            }}
          >
            LIKE
          </animated.div>

          {/* Card Content */}
          <div className="p-4 h-[500px] flex flex-col border-2 rounded-lg backdrop-blur-sm bg-white/5">
            <h2 className="text-2xl font-bold mb-2">{currentIdea.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentIdea.tags.map((tag) => (
                <GlassBadge key={tag}>{tag}</GlassBadge>
              ))}
            </div>
            <p className="text-muted-foreground overflow-y-auto h-full">{currentIdea.description}</p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="rounded-full size-12 border-2 border-red-500/90 hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-colors"
                onClick={onReject}
              >
                <X className="size-6" />
              </button>
              <button
                className="rounded-full size-12 border-2 border-green-500/90 hover:bg-green-500/10 text-green-500 flex items-center justify-center transition-colors"
                onClick={onLike}
              >
                <Heart className="size-6" />
              </button>
            </div>
          </div>
        </animated.div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {currentIndex + 1} of {ideas.length}
        </div>
      </div>
    </>
  )
}
