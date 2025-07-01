import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { PlannerColumn as ColumnType } from '../hooks/usePlanner'
import { PlannerItem } from './PlannerItem'
import { GlassCard } from '@/components/ui/glass-card'
import { GlassButton } from '@/components/ui/glass-button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react'
import { usePlanner } from '../hooks/usePlanner'
import { toast } from 'sonner'

interface PlannerColumnProps {
  column: ColumnType
  projectId: string
  onMoveItem: (itemId: string, destinationColumnId: string, destinationIndex: number) => void
}

interface DragItem {
  type: string
  id: string
  index: number
}

export function PlannerColumn({ column, projectId, onMoveItem }: PlannerColumnProps) {
  const { addItem, editColumn, removeColumn } = usePlanner(projectId)

  const [showAddItem, setShowAddItem] = useState(false)
  const [showEditColumn, setShowEditColumn] = useState(false)
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newItemDescription, setNewItemDescription] = useState('')
  const [editColumnTitle, setEditColumnTitle] = useState(column.title)

  const [{ isOver }, drop] = useDrop({
    accept: 'item',
    drop: (item: DragItem, monitor) => {
      if (!monitor.didDrop()) {
        onMoveItem(item.id, column.id, column.items.length)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const handleAddItem = async () => {
    if (!newItemTitle.trim()) return

    try {
      await addItem(column.id, newItemTitle.trim(), newItemDescription.trim() || undefined)
      setNewItemTitle('')
      setNewItemDescription('')
      setShowAddItem(false)
      toast.success('Task added successfully')
    } catch (error) {
      toast.error('Failed to add task')
    }
  }

  const handleEditColumn = async () => {
    if (!editColumnTitle.trim()) return

    try {
      await editColumn(column.id, editColumnTitle.trim())
      setShowEditColumn(false)
      toast.success('Column updated successfully')
    } catch (error) {
      toast.error('Failed to update column')
    }
  }

  const handleDeleteColumn = async () => {
    if (column.items.length > 0) {
      toast.error('Cannot delete column with tasks. Move or delete tasks first.')
      return
    }

    try {
      await removeColumn(column.id)
      toast.success('Column deleted successfully')
    } catch (error) {
      toast.error('Failed to delete column')
    }
  }

  return (
    <div ref={drop} className={`min-w-[300px] transition-colors ${isOver ? 'bg-white/5 rounded-lg' : ''}`}>
      <GlassCard className="p-4 h-fit">
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white">{column.title}</h3>
            <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">{column.items.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <Dialog open={showEditColumn} onOpenChange={setShowEditColumn}>
              <DialogTrigger asChild>
                <GlassButton size="sm" variant="ghost">
                  <Edit className="size-4" />
                </GlassButton>
              </DialogTrigger>
              <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit Column</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    value={editColumnTitle}
                    onChange={(e) => setEditColumnTitle(e.target.value)}
                    placeholder="Column title"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleEditColumn()
                    }}
                  />
                  <div className="flex justify-between">
                    <GlassButton
                      variant="outline"
                      onClick={handleDeleteColumn}
                      className="text-red-300 border-red-300/20 hover:bg-red-500/10"
                    >
                      <Trash2 className="size-4" />
                      Delete Column
                    </GlassButton>
                    <div className="flex gap-3">
                      <GlassButton variant="outline" onClick={() => setShowEditColumn(false)}>
                        Cancel
                      </GlassButton>
                      <GlassButton onClick={handleEditColumn}>Save</GlassButton>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-3 min-h-[100px]">
          {column.items.map((item, index) => (
            <PlannerItem
              key={item.id}
              item={item}
              index={index}
              columnId={column.id}
              onMoveItem={onMoveItem}
            />
          ))}
        </div>

        {/* Add Item Button */}
        <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
          <DialogTrigger asChild>
            <GlassButton variant="ghost" className="w-full mt-3 text-white/60 hover:text-white">
              <Plus className="size-4 mr-2" />
              Add a task
            </GlassButton>
          </DialogTrigger>
          <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder="Task title"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleAddItem()
                  }
                }}
              />
              <Textarea
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                placeholder="Task description (optional)"
                rows={3}
              />
              <div className="flex justify-end gap-3">
                <GlassButton variant="outline" onClick={() => setShowAddItem(false)}>
                  Cancel
                </GlassButton>
                <GlassButton onClick={handleAddItem}>Add Task</GlassButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </GlassCard>
    </div>
  )
}
