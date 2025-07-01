import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { generateIdeasAction, type GeneratedIdeaResponse } from '@/server-fns/generate-ideas'
import { Tag, Settings, ModalType, IdeaStep, GeneratedIdea } from '../types'
import { PICKER_CONFIGS } from '../constants/categories'

export function useIdeaGenerator() {
  const [problems, setProblems] = useState<Tag[]>([])
  const [technologies, setTechnologies] = useState<Tag[]>([])
  const [targetAudiences, setTargetAudiences] = useState<Tag[]>([])
  const [themes, setThemes] = useState<Tag[]>([])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [currentModalType, setCurrentModalType] = useState<ModalType>('technology')

  const [settings, setSettings] = useState<Settings>({
    profitability: 'medium',
    novelty: 'fresh',
    feasibility: 'realistic',
  })

  const [instruction, setInstruction] = useState<string>('Brainstorm ideas for my projects')

  // New state for multi-step process
  const [currentStep, setCurrentStep] = useState<IdeaStep>('input')
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([])
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0)
  const [likedIdeas, setLikedIdeas] = useState<GeneratedIdea[]>([])
  const [rejectedIdeas, setRejectedIdeas] = useState<GeneratedIdea[]>([])

  const currentPickerConfig = PICKER_CONFIGS[currentModalType]

  // React Query mutation for generating ideas
  const {
    mutate: generateIdeasMutation,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await generateIdeasAction({
        data: {
          problems: problems.map((p) => p.text),
          technologies: technologies.map((t) => t.text),
          targetAudiences: targetAudiences.map((a) => a.text),
          themes: themes.map((t) => t.text),
          settings,
          instruction,
        },
      })

      if (!response.success && response.error) {
        throw new Error(response.error)
      }

      console.log('response', response)

      return response.ideas
    },
    onSuccess: (ideas: GeneratedIdeaResponse[]) => {
      // Convert server response to client format
      const convertedIdeas: GeneratedIdea[] = ideas.map((idea) => ({
        ...idea,
        clientData: {
          isLiked: false,
          notes: '',
        },
      }))

      setGeneratedIdeas(convertedIdeas)
      setCurrentIdeaIndex(0)
      setLikedIdeas([])
      setRejectedIdeas([])
      setCurrentStep('filtering')
    },
    onError: (error) => {
      console.error('Failed to generate ideas:', error)
    },
  })

  const removeTag = (tagId: string, setter: React.Dispatch<React.SetStateAction<Tag[]>>) => {
    setter((prev) => prev.filter((tag) => tag.id !== tagId))
  }

  const addSelectedItems = () => {
    const config = PICKER_CONFIGS[currentModalType]
    const newItems = selectedItems
      .map((itemId) => {
        const item = config.items.find((i) => i.id === itemId)
        return item ? { id: item.id, text: item.text } : null
      })
      .filter(Boolean) as Tag[]

    const setter = {
      problem: setProblems,
      technology: setTechnologies,
      audience: setTargetAudiences,
      theme: setThemes,
    }[currentModalType]

    setter((prev) => [...prev, ...newItems.filter((item) => !prev.find((p) => p.text === item.text))])

    setSelectedItems([])
    setModalOpen(false)
  }

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    )
  }

  const openModal = (type: ModalType) => {
    setCurrentModalType(type)
    setModalOpen(true)
    setSearchTerm('')
    setSelectedItems([])
  }

  const addRandomItemsToAll = () => {
    const getRandomCount = () => Math.floor(Math.random() * 3) + 1 // 1, 2, or 3

    const addRandomToCategory = (
      setter: React.Dispatch<React.SetStateAction<Tag[]>>,
      allItems: readonly { id: string; text: string }[],
      currentItems: Tag[],
    ) => {
      const count = getRandomCount()
      const availableItems = allItems.filter(
        (item) => !currentItems.some((currentItem) => currentItem.id === item.id),
      )
      const shuffled = [...availableItems].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, count).map((item) => ({ id: item.id, text: item.text }))
      setter((prev) => [...prev, ...selected])
    }

    addRandomToCategory(setProblems, PICKER_CONFIGS.problem.items, problems)
    addRandomToCategory(setThemes, PICKER_CONFIGS.theme.items, themes)
    addRandomToCategory(setTargetAudiences, PICKER_CONFIGS.audience.items, targetAudiences)
    addRandomToCategory(setTechnologies, PICKER_CONFIGS.technology.items, technologies)
  }

  const clearAll = () => {
    setProblems([])
    setTechnologies([])
    setTargetAudiences([])
    setThemes([])
    setCurrentModalType('technology')
    setSettings({
      profitability: 'medium',
      novelty: 'fresh',
      feasibility: 'realistic',
    })
    setInstruction('Brainstorm ideas for my projects')
  }

  // Updated function to use the mutation
  const generateIdeas = () => {
    generateIdeasMutation()
  }

  const likeCurrentIdea = () => {
    if (currentIdeaIndex < generatedIdeas.length) {
      const currentIdea = generatedIdeas[currentIdeaIndex]
      setLikedIdeas((prev) => [...prev, currentIdea])
      moveToNextIdea()
    }
  }

  const rejectCurrentIdea = () => {
    if (currentIdeaIndex < generatedIdeas.length) {
      const currentIdea = generatedIdeas[currentIdeaIndex]
      setRejectedIdeas((prev) => [...prev, currentIdea])
      moveToNextIdea()
    }
  }

  const moveToNextIdea = () => {
    if (currentIdeaIndex < generatedIdeas.length - 1) {
      setCurrentIdeaIndex((prev) => prev + 1)
    } else {
      setCurrentStep('results')
    }
  }

  const resetGenerator = () => {
    clearAll()
    setCurrentStep('input')
    setGeneratedIdeas([])
    setCurrentIdeaIndex(0)
    setLikedIdeas([])
    setRejectedIdeas([])
  }

  return {
    // State
    problems,
    technologies,
    targetAudiences,
    themes,
    searchTerm,
    selectedItems,
    modalOpen,
    currentModalType,
    settings,
    currentPickerConfig,
    instruction,
    currentStep,
    isLoading,
    generatedIdeas,
    currentIdeaIndex,
    likedIdeas,
    rejectedIdeas,
    error,

    // Setters
    setProblems,
    setTechnologies,
    setTargetAudiences,
    setThemes,
    setSearchTerm,
    setSelectedItems,
    setModalOpen,
    setCurrentModalType,
    setSettings,
    setInstruction,
    setCurrentStep,
    setLikedIdeas,

    // Actions
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
  }
}
