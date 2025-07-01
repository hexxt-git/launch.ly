import { useIdeaGenerator } from '../hooks/useIdeaGenerator'
import { ItemPicker } from './ItemPicker'
import { LoadingStep } from './LoadingStep'
import { InputStep } from './InputStep'
import { FilteringStep } from './FilteringStep'
import { ResultsStep } from './ResultsStep'

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
    setLikedIdeas,
  } = useIdeaGenerator()

  const renderCurrentStep = () => {
    if (isLoading) return <LoadingStep />

    if (currentStep === 'input') {
      return (
        <InputStep
          problems={problems}
          technologies={technologies}
          targetAudiences={targetAudiences}
          themes={themes}
          settings={settings}
          instruction={instruction}
          isLoading={isLoading}
          onRemoveTag={(tagId) => removeTag(tagId, setProblems)}
          onOpenModal={openModal}
          onAddRandomItems={addRandomItemsToAll}
          onClearAll={clearAll}
          onSettingsChange={setSettings}
          onInstructionChange={setInstruction}
          onGenerateIdeas={generateIdeas}
          setProblems={setProblems}
          setTechnologies={setTechnologies}
          setTargetAudiences={setTargetAudiences}
          setThemes={setThemes}
        />
      )
    }

    if (currentStep === 'filtering') {
      return (
        <FilteringStep
          ideas={generatedIdeas}
          currentIndex={currentIdeaIndex}
          onLike={likeCurrentIdea}
          onReject={rejectCurrentIdea}
          onBack={() => setCurrentStep('input')}
        />
      )
    }

    if (currentStep === 'results') {
      return (
        <ResultsStep
          likedIdeas={likedIdeas}
          onBack={() => setCurrentStep('filtering')}
          onReset={resetGenerator}
          onReorder={setLikedIdeas}
        />
      )
    }

    return null
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
