import { Button } from '@/components/ui/button'
import { GlassButton } from '@/components/ui/glass-button'
import { Textarea } from '@/components/ui/textarea'
import { Dices, RotateCcw, Trash } from 'lucide-react'
import { IdeaHeader } from './IdeaHeader'
import { TagGrid } from './TagGrid'
import { SettingsSection } from './SettingsSection'
import { Settings } from '../types'

interface InputStepProps {
  problems: { id: string; text: string }[]
  technologies: { id: string; text: string }[]
  targetAudiences: { id: string; text: string }[]
  themes: { id: string; text: string }[]
  settings: Settings
  instruction: string
  isLoading: boolean
  onRemoveTag: (tagId: string, setterFn: (tags: { id: string; text: string }[]) => void) => void
  onOpenModal: (type: string) => void
  onAddRandomItems: () => void
  onClearAll: () => void
  onSettingsChange: (settings: Settings) => void
  onInstructionChange: (instruction: string) => void
  onGenerateIdeas: () => void
  setProblems: (tags: { id: string; text: string }[]) => void
  setTechnologies: (tags: { id: string; text: string }[]) => void
  setTargetAudiences: (tags: { id: string; text: string }[]) => void
  setThemes: (tags: { id: string; text: string }[]) => void
}

export function InputStep({
  problems,
  technologies,
  targetAudiences,
  themes,
  settings,
  instruction,
  isLoading,
  onRemoveTag,
  onOpenModal,
  onAddRandomItems,
  onClearAll,
  onSettingsChange,
  onInstructionChange,
  onGenerateIdeas,
  setProblems,
  setTechnologies,
  setTargetAudiences,
  setThemes,
}: InputStepProps) {
  return (
    <>
      <IdeaHeader
        title="Idea Generator"
        subtitle="Generate ideas for your next project."
        right={
          <>
            <Button variant="ghost" size="icon" onClick={onClearAll}>
              <Trash className="size-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onAddRandomItems}>
              <Dices className="size-6" />
            </Button>
          </>
        }
      />
      {/* Tag Grid */}
      <div className="grid md:grid-cols-2 grid-rows-4 md:grid-rows-2 min-h-[500px]">
        <TagGrid
          title="problem(s)"
          tags={problems}
          onRemoveTag={(tagId) => onRemoveTag(tagId, setProblems)}
          onAddClick={() => onOpenModal('problem')}
        />

        <TagGrid
          title="theme(s)"
          tags={themes}
          onRemoveTag={(tagId) => onRemoveTag(tagId, setThemes)}
          onAddClick={() => onOpenModal('theme')}
        />

        <TagGrid
          title="target audience(s)"
          tags={targetAudiences}
          onRemoveTag={(tagId) => onRemoveTag(tagId, setTargetAudiences)}
          onAddClick={() => onOpenModal('audience')}
        />

        <TagGrid
          title="technology(s)"
          tags={technologies}
          onRemoveTag={(tagId) => onRemoveTag(tagId, setTechnologies)}
          onAddClick={() => onOpenModal('technology')}
        />
      </div>

      {/* Settings */}
      <div className="mt-8">
        <SettingsSection settings={settings} onSettingsChange={onSettingsChange} />

        {/* Instructions */}
        <div className="mt-8">
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-lg font-medium mb-4">Instructions</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onInstructionChange('Brainstorm ideas for my projects')}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder="Enter your instructions here..."
            className="resize-none"
            rows={4}
            value={instruction}
            onChange={(e) => onInstructionChange(e.target.value)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-12">
        <GlassButton variant="outline" size="lg" containerClassName="flex-1" onClick={onClearAll}>
          Reset
        </GlassButton>
        <GlassButton
          size="lg"
          containerClassName="flex-1"
          variant="primary"
          onClick={onGenerateIdeas}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Ideas'}
        </GlassButton>
      </div>
    </>
  )
}
