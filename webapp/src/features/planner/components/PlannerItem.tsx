import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { PlannerItem as ItemType } from '../hooks/usePlanner'
import { GlassCard } from '@/components/ui/glass-card'
import { GlassButton } from '@/components/ui/glass-button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Edit, Trash2, GripVertical } from 'lucide-react'
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

  const [showEdit, setShowEdit] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)
  const [editDescription, setEditDescription] = useState(item.description || '')

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'item',
    item: { type: 'item', id: item.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(dragItem: DragItem, monitor) {
      if (!monitor.canDrop()) return

      const dragIndex = dragItem.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragItem.id === item.id) return

      // Move the item
      onMoveItem(dragItem.id, columnId, hoverIndex)

      // Update the drag item's index for continued hover
      dragItem.index = hoverIndex
    },
  })

  const handleToggleComplete = async () => {
    try {
      await editItem(item.id, { completed: !item.completed })
      toast.success(item.completed ? 'Task marked incomplete' : 'Task completed!')
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleEdit = async () => {
    if (!editTitle.trim()) return

    try {
      await editItem(item.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      })
      setShowEdit(false)
      toast.success('Task updated successfully')
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleDelete = async () => {
    try {
      await removeItem(item.id)
      toast.success('Task deleted successfully')
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  return (
    <div
      ref={(node) => {
        drag(drop(node))
      }}
      data-handler-id={handlerId}
    >
      <GlassCard
        className={`p-3 cursor-grab transition-all hover:scale-[1.02] ${
          isDragging ? 'opacity-50 rotate-2' : ''
        } ${item.completed ? 'opacity-60' : ''}`}
      >
        <div className="flex items-start gap-3">
          <Checkbox checked={item.completed} onCheckedChange={handleToggleComplete} className="mt-1" />

          <div className="flex-1 min-w-0">
            <h4
              className={`text-sm font-medium text-white ${
                item.completed ? 'line-through text-white/60' : ''
              }`}
            >
              {item.title}
            </h4>
            {item.description && (
              <p className={`text-xs text-white/60 mt-1 ${item.completed ? 'line-through' : ''}`}>
                {item.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Dialog open={showEdit} onOpenChange={setShowEdit}>
              <DialogTrigger asChild>
                <GlassButton size="sm" variant="outline">
                  <Edit className="size-3" />
                </GlassButton>
              </DialogTrigger>
              <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Task title"
                  />
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Task description (optional)"
                    rows={3}
                  />
                  <div className="flex justify-between">
                    <GlassButton
                      variant="outline"
                      onClick={handleDelete}
                      className="text-red-300 border-red-300/20 hover:bg-red-500/10"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </GlassButton>
                    <div className="flex gap-3">
                      <GlassButton variant="outline" onClick={() => setShowEdit(false)}>
                        Cancel
                      </GlassButton>
                      <GlassButton onClick={handleEdit}>Save</GlassButton>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="cursor-grab">
              <GripVertical className="size-3 text-white/40" />
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
