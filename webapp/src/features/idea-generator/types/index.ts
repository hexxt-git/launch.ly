export interface Tag {
  id: string
  text: string
  category?: string
}

export interface TechnologyTag extends Tag {
  category: TechnologyCategory
}

export type TechnologyCategory = 'ai' | 'blockchain' | 'cloud' | 'web' | 'mobile' | 'video' | 'other'

export interface Settings {
  profitability: 'low' | 'medium' | 'high'
  novelty: 'familiar' | 'fresh' | 'revolutionary'
  feasibility: 'ambitious' | 'realistic' | 'practical'
}

export type ModalType = 'problem' | 'technology' | 'audience' | 'theme'

export interface CategoryColors {
  border: string
  bg: string
  selectedBorder: string
  text: string
}

export interface PickerItem {
  id: string
  text: string
  category: string
}

export interface PickerCategory {
  id: string
  name: string
  color: string
}

export interface PickerConfig {
  title: string
  items: PickerItem[]
  categories: PickerCategory[]
}

export type IdeaStep = 'input' | 'filtering' | 'results'

export interface IdeaAnalytics {
  profitability: number
  marketability: number
  feasibility: number
  innovation: number
  scalability: number
}

export interface IdeaClientData {
  isLiked: boolean
  notes: string
}

export interface GeneratedIdea {
  id: string
  title: string
  description: string
  tags: string[]
  analytics: IdeaAnalytics
  clientData: IdeaClientData
}
