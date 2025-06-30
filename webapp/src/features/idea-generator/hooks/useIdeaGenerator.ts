import { useState } from 'react'
import { Tag, Settings, ModalType } from '../types'
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
    creativity: 'balanced',
    novelty: 'fresh',
    feasibility: 'realistic',
  })

  const [instruction, setInstruction] = useState<string>('Brainstorm ideas for my projects')

  const currentPickerConfig = PICKER_CONFIGS[currentModalType]

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

    // Actions
    removeTag,
    addSelectedItems,
    toggleItem,
    openModal,
    addRandomItemsToAll,
  }
}
