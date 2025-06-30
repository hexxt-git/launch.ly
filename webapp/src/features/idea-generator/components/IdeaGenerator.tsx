import { Button } from '@/components/ui/button'
import { GlassButton } from '@/components/ui/glass-button'
import { Textarea } from '@/components/ui/textarea'
import { Dice1, Dices, RotateCcw, Trash, Heart, X, ArrowLeft } from 'lucide-react'
import { useIdeaGenerator } from '../hooks/useIdeaGenerator'
import { TagGrid } from './TagGrid'
import { SettingsSection } from './SettingsSection'
import { ItemPicker } from './ItemPicker'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { GeneratedIdea } from '../types'
import { IdeaHeader } from './IdeaHeader'

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
    currentStep,
    isLoading,
    generatedIdeas,
    currentIdeaIndex,
    likedIdeas,
    rejectedIdeas,
    setProblems,
    setTechnologies,
    setTargetAudiences,
    setThemes,
    setSearchTerm,
    setModalOpen,
    setSettings,
    setInstruction,
    setCurrentStep,
    removeTag,
    addSelectedItems,
    toggleItem,
    openModal,
    addRandomItemsToAll,
    clearAll,
    generateIdeas,
    likeCurrentIdea,
    rejectCurrentIdea,
    resetGenerator,
  } = useIdeaGenerator()

  const renderInputStep = () => (
    <>
      <IdeaHeader
        title="Idea Generator"
        subtitle="Generate ideas for your next project."
        right={
          <>
            <Button variant="ghost" size="icon" onClick={clearAll}>
              <Trash className="size-6 scale-90" />
            </Button>
            <Button variant="ghost" size="icon" onClick={addRandomItemsToAll}>
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
        <Button variant="outline" size="lg" className="flex-1" onClick={clearAll}>
          Reset
        </Button>
        <GlassButton
          size="lg"
          containerClassName="flex-1"
          variant="primary"
          onClick={generateIdeas}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Ideas'}
        </GlassButton>
      </div>
    </>
  )

  const renderLoadingStep = () => (
    <div className="flex flex-col min-h-[400px] items-center justify-center">
      <div className="animate-spin mb-8">
        <Dices className="size-12 text-primary" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-lg font-semibold mb-2">Generating ideas...</div>
        <div className="text-muted-foreground">This may take a few seconds.</div>
      </div>
    </div>
  )

  const renderIdeaCard = (idea: GeneratedIdea) => (
    <GlassCard className="p-6 h-[500px] flex flex-col border-2">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">{idea.title}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground">{idea.description}</p>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full h-16 w-16 p-0 border-red-500/50 hover:bg-red-500/10 hover:text-red-500"
          onClick={rejectCurrentIdea}
        >
          <X className="h-8 w-8" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full h-16 w-16 p-0 border-green-500/50 hover:bg-green-500/10 hover:text-green-500"
          onClick={likeCurrentIdea}
        >
          <Heart className="h-8 w-8" />
        </Button>
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        {currentIdeaIndex + 1} of {generatedIdeas.length}
      </div>
    </GlassCard>
  )

  const renderFilteringStep = () => (
    <div className="flex flex-col">
      <IdeaHeader
        title="Choose Ideas Worth Building"
        subtitle="filter out the ideas you don't like"
        left={
          <Button variant="ghost" size="icon" onClick={() => setCurrentStep('input')}>
            <ArrowLeft className="size-6" />
          </Button>
        }
      />

      {currentIdeaIndex < generatedIdeas.length && renderIdeaCard(generatedIdeas[currentIdeaIndex])}
    </div>
  )

  const renderResultsStep = () => (
    <div className="flex flex-col">
      <IdeaHeader
        title="Your Selected Ideas"
        right={
          <>
            <Button variant="ghost" onClick={resetGenerator}>
              Start Over
              <RotateCcw className="size-4" />
            </Button>
          </>
        }
      />

      <div className="grid gap-6 w-full max-w-4xl">
        {likedIdeas.length === 0 ? (
          <div className="p-12">
            <p className="text-muted-foreground">You haven't liked any ideas yet.</p>
            <Button className="mt-4" onClick={() => setCurrentStep('filtering')}>
              Go Back to Filtering
            </Button>
          </div>
        ) : (
          likedIdeas.map((idea) => (
            <GlassCard key={idea.id} className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{idea.title}</h3>
                <div className="flex gap-2">
                  {idea.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-muted-foreground line-clamp-3">{idea.description}</p>
              <Button variant="ghost" className="mt-2 p-0 h-auto text-sm text-primary">
                View Details
              </Button>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    if (isLoading) return renderLoadingStep()
    if (currentStep === 'input') return renderInputStep()
    if (currentStep === 'filtering') return renderFilteringStep()
    if (currentStep === 'results') return renderResultsStep()
    return renderInputStep()
  }

  return (
    <>
      {renderCurrentStep()}

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
