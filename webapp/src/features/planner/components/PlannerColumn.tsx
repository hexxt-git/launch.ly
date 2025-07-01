import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { PlannerColumn as ColumnType } from '../hooks/usePlanner'
import { PlannerItem } from './PlannerItem'
import { GlassCard } from '@/components/ui/glass-card'
import { GlassButton } from '@/components/ui/glass-button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, X, Check } from 'lucide-react'
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newItemDescription, setNewItemDescription] = useState('')
  const [editColumnTitle, setEditColumnTitle] = useState(column.title)
  const [isAddingItem, setIsAddingItem] = useState(false)

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
      setIsAddingItem(true)
      await addItem(column.id, newItemTitle.trim(), newItemDescription.trim() || undefined)
      setNewItemTitle('')
      setNewItemDescription('')
      setShowAddItem(false)
      toast.success('Task added successfully')
    } catch (error) {
      toast.error('Failed to add task')
    } finally {
      setIsAddingItem(false)
    }
  }

  const handleCancelAddItem = () => {
    setShowAddItem(false)
    setNewItemTitle('')
    setNewItemDescription('')
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
      setShowDeleteConfirm(false)
      toast.success('Column deleted successfully')
    } catch (error) {
      toast.error('Failed to delete column')
    }
  }

  return (
    <div
      ref={(node) => {
        drop(node)
      }}
      className={`min-w-[300px] transition-colors ${isOver ? 'bg-white/5 rounded-lg' : ''}`}
    >
      <GlassCard className="p-4 h-fit">
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white">{column.title}</h3>
            <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded me-1.5">
              {column.items.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Dialog open={showEditColumn} onOpenChange={setShowEditColumn}>
              <DialogTrigger asChild>
                <GlassButton size="sm" variant="outline">
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
                  <div className="flex justify-end gap-3">
                    <GlassButton variant="outline" onClick={() => setShowEditColumn(false)}>
                      Cancel
                    </GlassButton>
                    <GlassButton onClick={handleEditColumn}>Save</GlassButton>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
              <DialogTrigger asChild>
                <GlassButton size="sm" variant="outline" className="text-red-300 hover:bg-red-500/10">
                  <Trash2 className="size-4" />
                </GlassButton>
              </DialogTrigger>
              <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">Delete Column</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-white/80">
                    {column.items.length > 0
                      ? 'This column still has tasks. Please move or delete all tasks before deleting the column.'
                      : 'Are you sure you want to delete this column? This action cannot be undone.'}
                  </p>
                  <div className="flex justify-end gap-3">
                    <GlassButton variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                      Cancel
                    </GlassButton>
                    <GlassButton
                      variant="outline"
                      onClick={handleDeleteColumn}
                      className="text-red-300 border-red-300/20 hover:bg-red-500/10"
                      disabled={column.items.length > 0}
                    >
                      Delete Column
                    </GlassButton>
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

        {/* Add Item Section */}
        {showAddItem ? (
          <div className="mt-3 space-y-3">
            <GlassCard className="p-3 border border-white/20">
              <div className="space-y-3">
                <Input
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="Enter task title..."
                  className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/50"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      if (newItemTitle.trim()) {
                        handleAddItem()
                      }
                    }
                    if (e.key === 'Escape') {
                      handleCancelAddItem()
                    }
                  }}
                />
                <Textarea
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  placeholder="Add a description (optional)..."
                  className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/50 resize-none"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      e.preventDefault()
                      if (newItemTitle.trim()) {
                        handleAddItem()
                      }
                    }
                    if (e.key === 'Escape') {
                      handleCancelAddItem()
                    }
                  }}
                />
                <div className="flex justify-end gap-2">
                  <GlassButton
                    size="sm"
                    variant="outline"
                    onClick={handleCancelAddItem}
                    disabled={isAddingItem}
                  >
                    <X className="size-3 mr-1" />
                    Cancel
                  </GlassButton>
                  <GlassButton
                    size="sm"
                    onClick={handleAddItem}
                    disabled={!newItemTitle.trim() || isAddingItem}
                  >
                    {isAddingItem ? (
                      <div className="size-3 animate-spin rounded-full border border-white/20 border-t-white mr-1" />
                    ) : (
                      <Check className="size-3 mr-1" />
                    )}
                    Add Task
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          </div>
        ) : (
          <GlassButton
            variant="outline"
            className="w-full mt-3 text-white/60 hover:text-white"
            onClick={() => setShowAddItem(true)}
          >
            <Plus className="size-4 mr-2" />
            Add a task
          </GlassButton>
        )}
      </GlassCard>
    </div>
  )
}
