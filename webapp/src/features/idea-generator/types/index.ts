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
  creativity: 'conservative' | 'balanced' | 'wild'
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
