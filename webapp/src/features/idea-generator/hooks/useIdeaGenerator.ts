import { useState } from 'react'
import { Tag, Settings, ModalType, IdeaStep, GeneratedIdea } from '../types'
import { PICKER_CONFIGS } from '../constants/categories'

// Mock server function to generate ideas
const generateIdeasFromServer = async (
  problems: Tag[],
  technologies: Tag[],
  targetAudiences: Tag[],
  themes: Tag[],
  settings: Settings,
  instruction: string,
): Promise<GeneratedIdea[]> => {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock generated ideas
  return [
    {
      id: '1',
      title: 'Local Loop Marketplace',
      description:
        'A community-driven, hyperlocal marketplace platform designed to empower local artisans, small businesses, and solo entrepreneurs by providing them with a digital storefront within their own neighborhoods. The platform connects buyers with trusted, nearby sellers to promote sustainable commerce, build stronger local economies, and reduce environmental impact. Users can browse products and services based on proximity, filter by category (handmade goods, groceries, personal care, home services, etc.), and choose between in-person pickup or same-day delivery through local couriers. Vendors can create customizable shop pages, receive customer reviews, and benefit from built-in tools for inventory management, promotion, and sales analytics.',
      tags: ['marketplace', 'e-commerce', 'ai', 'blockchain'],
      analytics: {
        profitability: 80,
        marketability: 80,
        feasibility: 80,
        innovation: 80,
        scalability: 80,
      },
      clientData: {
        isLiked: false,
        notes: '',
      },
    },
    {
      id: '2',
      title: 'EcoTrack Personal Carbon Calculator',
      description:
        "A comprehensive mobile app that helps environmentally conscious individuals track, understand, and reduce their carbon footprint. The app uses AI to analyze users' daily activities, transportation choices, energy consumption, and purchasing habits to provide personalized insights and actionable recommendations. Users can set sustainability goals, join community challenges, and earn rewards for making eco-friendly choices. The app integrates with smart home devices, fitness trackers, and bank accounts to automatically gather data and provide real-time feedback. EcoTrack also includes a social component where users can compare their progress with friends, share tips, and collaborate on local environmental initiatives.",
      tags: ['sustainability', 'mobile', 'ai', 'data'],
      analytics: {
        profitability: 80,
        marketability: 80,
        feasibility: 80,
        innovation: 80,
        scalability: 80,
      },
      clientData: {
        isLiked: false,
        notes: '',
      },
    },
    {
      id: '3',
      title: 'MindfulMoment AR Wellness Space',
      description:
        "An augmented reality application that transforms any physical space into a personalized wellness sanctuary. Users can escape daily stress by immersing themselves in calming, customizable environments overlaid on their actual surroundings. The app offers guided meditation sessions, breathing exercises, and gentle movement practices tailored to the user's current emotional state, available time, and wellness goals. Advanced biometric feedback through smartphone sensors or wearable devices helps optimize the experience and track progress over time. The app includes a library of natural soundscapes, ambient music, and narrations by renowned wellness experts. Perfect for quick mental breaks during work, creating a peaceful bedtime routine, or enhancing regular mindfulness practice.",
      tags: ['health', 'mobile', 'ar', 'wellness'],
      analytics: {
        profitability: 80,
        marketability: 80,
        feasibility: 80,
        innovation: 80,
        scalability: 80,
      },
      clientData: {
        isLiked: false,
        notes: '',
      },
    },
    {
      id: '4',
      title: 'SkillSwap Community Learning Network',
      description:
        "A peer-to-peer platform that enables users to exchange knowledge and skills without monetary transactions. Users create profiles highlighting what they can teach and what they want to learn, and the platform's matching algorithm connects compatible skill-swappers. The service facilitates both virtual and in-person learning sessions, provides scheduling tools, curriculum templates, and progress tracking. Community ratings and reviews help maintain quality and build trust. The platform supports one-on-one exchanges as well as group workshops and includes features for community building like discussion forums, skill challenges, and collaborative projects. SkillSwap democratizes education by recognizing that everyone has valuable knowledge to share, regardless of formal credentials.",
      tags: ['education', 'community', 'web', 'social'],
      analytics: {
        profitability: 80,
        marketability: 80,
        feasibility: 80,
        innovation: 80,
        scalability: 80,
      },
      clientData: {
        isLiked: false,
        notes: '',
      },
    },
    {
      id: '5',
      title: 'NutriScan Food Analyzer',
      description:
        "A smartphone app that uses computer vision and AI to analyze food items and provide detailed nutritional information. Users can scan packaged products, restaurant meals, or even homemade dishes to receive instant data about calories, macronutrients, micronutrients, allergens, and additives. The app considers users' dietary preferences, restrictions, and health goals to provide personalized recommendations and alternatives. For those with specific health conditions like diabetes or hypertension, NutriScan offers specialized monitoring features and alerts. The app builds a comprehensive food diary automatically and generates insights about eating patterns and nutritional gaps. Integration with grocery delivery services allows users to easily order healthier alternatives recommended by the app.",
      tags: ['health', 'ai', 'mobile', 'computer vision'],
      analytics: {
        profitability: 80,
        marketability: 80,
        feasibility: 80,
        innovation: 80,
        scalability: 80,
      },
      clientData: {
        isLiked: false,
        notes: '',
      },
    },
  ]
}

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
  const [isLoading, setIsLoading] = useState(false)
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([])
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0)
  const [likedIdeas, setLikedIdeas] = useState<GeneratedIdea[]>([])
  const [rejectedIdeas, setRejectedIdeas] = useState<GeneratedIdea[]>([])

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

  // New functions for multi-step process
  const generateIdeas = async () => {
    setIsLoading(true)
    try {
      const ideas = await generateIdeasFromServer(
        problems,
        technologies,
        targetAudiences,
        themes,
        settings,
        instruction,
      )
      setGeneratedIdeas(ideas)
      setCurrentIdeaIndex(0)
      setLikedIdeas([])
      setRejectedIdeas([])
      setCurrentStep('filtering')
    } catch (error) {
      console.error('Failed to generate ideas:', error)
    } finally {
      setIsLoading(false)
    }
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
