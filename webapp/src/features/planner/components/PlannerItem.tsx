import { useState } from 'react'
import { useDrag } from 'react-dnd'
import { PlannerItem as ItemType } from '../hooks/usePlanner'
import { GlassCard } from '@/components/ui/glass-card'
import { GlassButton } from '@/components/ui/glass-button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Edit, Trash2, GripVertical, X, Check } from 'lucide-react'
import { usePlanner } from '../hooks/usePlanner'
import { toast } from 'sonner'

interface PlannerItemProps {
  item: ItemType
  index: number
  columnId: string
  onMoveItem: (itemId: string, destinationColumnId: string, destinationIndex: number) => void
}

interface DragItem {
  type: string
  id: string
  index: number
}

export function PlannerItem({ item, index, columnId, onMoveItem }: PlannerItemProps) {
  const { editItem, removeItem } = usePlanner(item.projectId)

  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)
  const [editDescription, setEditDescription] = useState(item.description || '')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { type: 'item', id: item.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const handleToggleComplete = async () => {
    try {
      setIsUpdating(true)
      await editItem(item.id, { completed: !item.completed })
      toast.success(item.completed ? 'Task marked incomplete' : 'Task completed!')
    } catch (error) {
      toast.error('Failed to update task')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleStartEdit = () => {
    setEditTitle(item.title)
    setEditDescription(item.description || '')
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setEditTitle(item.title)
    setEditDescription(item.description || '')
    setIsEditing(false)
  }

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return

    try {
      setIsUpdating(true)
      await editItem(item.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      })
      setIsEditing(false)
      toast.success('Task updated successfully')
    } catch (error) {
      toast.error('Failed to update task')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await removeItem(item.id)
      setShowDeleteConfirm(false)
      toast.success('Task deleted successfully')
    } catch (error) {
      toast.error('Failed to delete task')
      setIsDeleting(false)
    }
  }

  if (isDeleting) {
    return (
      <div className="animate-fade-out">
        <GlassCard className="p-3 opacity-50">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white line-through">{item.title}</h4>
            </div>
          </div>
        </GlassCard>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div
        ref={(node) => {
          drag(node)
        }}
      >
        <GlassCard className="p-3 border border-white/20">
          <div className="space-y-3">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task title..."
              className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/50"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  if (editTitle.trim()) {
                    handleSaveEdit()
                  }
                }
                if (e.key === 'Escape') {
                  handleCancelEdit()
                }
              }}
            />
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Add a description (optional)..."
              className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/50 resize-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  e.preventDefault()
                  if (editTitle.trim()) {
                    handleSaveEdit()
                  }
                }
                if (e.key === 'Escape') {
                  handleCancelEdit()
                }
              }}
            />
            <div className="flex justify-end gap-2">
              <GlassButton size="sm" variant="outline" onClick={handleCancelEdit} disabled={isUpdating}>
                <X className="size-3 mr-1" />
                Cancel
              </GlassButton>
              <GlassButton size="sm" onClick={handleSaveEdit} disabled={!editTitle.trim() || isUpdating}>
                {isUpdating ? (
                  <div className="size-3 animate-spin rounded-full border border-white/20 border-t-white mr-1" />
                ) : (
                  <Check className="size-3 mr-1" />
                )}
                Save
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </div>
    )
  }

  return (
    <div
      ref={(node) => {
        drag(node)
      }}
    >
      <GlassCard
        className={`p-3 cursor-grab transition-all hover:scale-[1.02] group relative ${
          isDragging ? 'opacity-50 rotate-2' : ''
        } ${item.completed ? 'opacity-60' : ''}`}
      >
        {/* Floating action buttons */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <GlassButton size="sm" variant="outline" onClick={handleStartEdit} className="h-6 w-6 p-0">
            <Edit className="size-3" />
          </GlassButton>

          <GlassButton
            onClick={handleDelete}
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0 text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="size-3" />
          </GlassButton>

          <div className="cursor-grab h-6 w-6 flex items-center justify-center">
            <GripVertical className="size-3 text-white/40" />
          </div>
        </div>

        {/* Main content with full width */}
        <div className="flex items-start gap-3">
          <Checkbox
            checked={item.completed}
            onCheckedChange={handleToggleComplete}
            disabled={isUpdating}
            className={`mt-1 ${isUpdating ? 'opacity-50' : ''}`}
          />

          <div className="flex-1 min-w-0" onClick={handleStartEdit}>
            <h4
              className={`text-sm font-medium text-white cursor-pointer hover:text-white/80 ${
                item.completed ? 'line-through text-white/60' : ''
              }`}
            >
              {item.title}
            </h4>
            {item.description && (
              <p
                className={`text-xs text-white/60 mt-1 cursor-pointer hover:text-white/50 ${
                  item.completed ? 'line-through' : ''
                }`}
              >
                {item.description}
              </p>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
