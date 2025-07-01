import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { usePlanner } from '../hooks/usePlanner'
import { PlannerColumn } from './PlannerColumn'
import { GlassPanel } from '@/components/ui/glass-panel'
import { GlassButton } from '@/components/ui/glass-button'
import { GlassCard } from '@/components/ui/glass-card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Bot, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface PlannerBoardProps {
  projectId: string
  projectName: string
  projectDescription?: string
}

export function PlannerBoard({ projectId, projectName, projectDescription }: PlannerBoardProps) {
  const { columns, loading, error, addColumn, generateTasks, moveItem } = usePlanner(projectId)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const [showAddColumn, setShowAddColumn] = useState(false)
  const [showAIGenerate, setShowAIGenerate] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleAddColumn = async () => {
    if (!newColumnTitle.trim()) return

    try {
      await addColumn(newColumnTitle.trim())
      setNewColumnTitle('')
      setShowAddColumn(false)
      toast.success('Column added successfully')
    } catch (error) {
      toast.error('Failed to add column')
    }
  }

  const handleGenerateTasks = async () => {
    if (!projectDescription && !aiPrompt.trim()) {
      toast.error('Please provide a project description or custom prompt')
      return
    }

    try {
      setIsGenerating(true)
      await generateTasks(projectDescription || 'Project planning', aiPrompt.trim() || undefined)
      setShowAIGenerate(false)
      setAiPrompt('')
      toast.success('AI tasks generated successfully!')
    } catch (error) {
      toast.error('Failed to generate tasks')
    } finally {
      setIsGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <GlassPanel className="max-w-4xl">
          <div className="text-center">
            <p className="text-white/60">Loading planner...</p>
          </div>
        </GlassPanel>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <GlassPanel className="max-w-4xl">
          <div className="text-center">
            <p className="text-red-300">Error: {error}</p>
          </div>
        </GlassPanel>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{projectName}</h1>
            <p className="text-white/60">Project Planner</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={showAIGenerate} onOpenChange={setShowAIGenerate}>
              <DialogTrigger asChild>
                <GlassButton className="gap-2">
                  <Bot className="size-4" />
                  AI Generate
                </GlassButton>
              </DialogTrigger>
              <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white flex items-center gap-2">
                    <Sparkles className="size-5" />
                    Generate Tasks with AI
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/80 mb-2 block">Custom Instructions (optional)</label>
                    <Textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Add any specific requirements or focus areas for the project plan..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <GlassButton variant="outline" onClick={() => setShowAIGenerate(false)}>
                      Cancel
                    </GlassButton>
                    <GlassButton onClick={handleGenerateTasks} disabled={isGenerating} className="gap-2">
                      {isGenerating ? (
                        <>
                          <div className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-4" />
                          Generate Tasks
                        </>
                      )}
                    </GlassButton>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showAddColumn} onOpenChange={setShowAddColumn}>
              <DialogTrigger asChild>
                <GlassButton className="gap-2">
                  <Plus className="size-4" />
                  Add Column
                </GlassButton>
              </DialogTrigger>
              <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Column</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    placeholder="Enter column title (e.g., Marketing, Development, Sales)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddColumn()
                    }}
                  />
                  <div className="flex justify-end gap-3">
                    <GlassButton variant="outline" onClick={() => setShowAddColumn(false)}>
                      Cancel
                    </GlassButton>
                    <GlassButton onClick={handleAddColumn}>Add Column</GlassButton>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Board */}
        {columns.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <div className="text-white/60 space-y-4">
              <p className="text-lg">No columns yet</p>
              <p className="text-sm">
                Start by adding a column or generate tasks with AI to create your project plan
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <GlassButton onClick={() => setShowAIGenerate(true)} className="gap-2">
                  <Bot className="size-4" />
                  Generate with AI
                </GlassButton>
                <GlassButton onClick={() => setShowAddColumn(true)} className="gap-2">
                  <Plus className="size-4" />
                  Add Column
                </GlassButton>
              </div>
            </div>
          </GlassCard>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-6">
            {columns.map((column) => (
              <PlannerColumn key={column.id} column={column} projectId={projectId} onMoveItem={moveItem} />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  )
}
