import { Button } from '@/components/ui/button'
import { GlassButton } from '@/components/ui/glass-button'
import { X } from 'lucide-react'
import { Tag } from '../types'

interface TagComponentProps {
  tag: Tag
  onRemove?: () => void
}

export function TagComponent({ tag, onRemove }: TagComponentProps) {
  return (
    <GlassButton>
      <span>{tag.text}</span>
      {onRemove && (
        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={onRemove}>
          <X className="h-3 w-3" />
        </Button>
      )}
    </GlassButton>
  )
}
