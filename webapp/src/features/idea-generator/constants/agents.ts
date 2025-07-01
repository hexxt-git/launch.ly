import { Brain, Briefcase, Copyright, Lightbulb, MessageSquare, Palette } from 'lucide-react'

export const AGENT_PROFILES = {
  Marketing: {
    icon: MessageSquare,
    color: 'text-blue-400',
    description: 'Marketing Strategist',
  },
  Brand: {
    icon: Palette,
    color: 'text-purple-400',
    description: 'Brand Identity Expert',
  },
  Software: {
    icon: Brain,
    color: 'text-green-400',
    description: 'Technical Architect',
  },
  Law: {
    icon: Copyright,
    color: 'text-red-400',
    description: 'Legal Advisor',
  },
  'Content Creator': {
    icon: Lightbulb,
    color: 'text-yellow-400',
    description: 'Creative Content Specialist',
  },
  Sales: {
    icon: Briefcase,
    color: 'text-orange-400',
    description: 'Sales Strategist',
  },
  Unknown: {
    icon: MessageSquare,
    color: 'text-gray-400',
    description: 'Unknown Agent',
  },
} as const

export type AgentType = keyof typeof AGENT_PROFILES
