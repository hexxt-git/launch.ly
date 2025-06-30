import { Button } from '@/components/ui/button'
import { GlassButton } from '@/components/ui/glass-button'
import { Textarea } from '@/components/ui/textarea'
import { Dice1, Dices, RotateCcw } from 'lucide-react'
import { useIdeaGenerator } from '../hooks/useIdeaGenerator'
import { TagGrid } from './TagGrid'
import { SettingsSection } from './SettingsSection'
import { ItemPicker } from './ItemPicker'

export function IdeaGenerator() {
  const {
    problems,
    technologies,
    targetAudiences,
    themes,
    searchTerm,
    selectedItems,
    modalOpen,
    settings,
    currentPickerConfig,
    instruction,
    setProblems,
    setTechnologies,
    setTargetAudiences,
    setThemes,
    setSearchTerm,
    setModalOpen,
    setSettings,
    setInstruction,
    removeTag,
    addSelectedItems,
    toggleItem,
    openModal,
    addRandomItemsToAll,
  } = useIdeaGenerator()

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gradient-primary">Idea Generator</h1>
          <p className="text-sm text-muted-foreground mb-8">Generate ideas for your next project.</p>
        </div>
        <Button variant="ghost" size="icon" onClick={addRandomItemsToAll}>
          <Dices className="size-6" />
        </Button>
      </div>
      {/* Tag Grid */}
      <div className="grid md:grid-cols-2 grid-rows-4 md:grid-rows-2 min-h-[500px]">
        <TagGrid
          title="problem(s)"
          tags={problems}
          onRemoveTag={(tagId) => removeTag(tagId, setProblems)}
          onAddClick={() => openModal('problem')}
        />

        <TagGrid
          title="theme(s)"
          tags={themes}
          onRemoveTag={(tagId) => removeTag(tagId, setThemes)}
          onAddClick={() => openModal('theme')}
        />

        <TagGrid
          title="target audience(s)"
          tags={targetAudiences}
          onRemoveTag={(tagId) => removeTag(tagId, setTargetAudiences)}
          onAddClick={() => openModal('audience')}
        />

        <TagGrid
          title="technology(s)"
          tags={technologies}
          onRemoveTag={(tagId) => removeTag(tagId, setTechnologies)}
          onAddClick={() => openModal('technology')}
        />
      </div>

      {/* Settings */}
      <div className="mt-8">
        <SettingsSection settings={settings} onSettingsChange={setSettings} />

        {/* Instructions */}
        <div className="mt-8">
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-lg font-medium mb-4">Instructions</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setInstruction('Brainstorm ideas for my projects')}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder="Enter your instructions here..."
            className="resize-none"
            rows={4}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-12">
        <Button variant="outline" size="lg" className="flex-1">
          Reset
        </Button>
        <GlassButton size="lg" containerClassName="flex-1" variant="primary">
          Generate Ideas
        </GlassButton>
      </div>

      {/* Item Picker Modal */}
      {currentPickerConfig && (
        <ItemPicker
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={currentPickerConfig.title}
          items={currentPickerConfig.items}
          categories={currentPickerConfig.categories}
          selectedItems={selectedItems}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onToggleItem={toggleItem}
          onAddSelected={addSelectedItems}
        />
      )}
    </>
  )
}
