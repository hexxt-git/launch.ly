import { cn } from '@/lib/utils'
import { TechnologyTag } from '../types'
import { CATEGORY_COLORS, TECHNOLOGY_CATEGORIES } from '../constants/categories'
import { GlassPanel } from '@/components/ui/glass-panel'

interface TechnologyListProps {
  technologies: TechnologyTag[]
  selectedTechnologies: string[]
  onToggleTechnology: (techId: string) => void
}

export function TechnologyList({
  technologies,
  selectedTechnologies,
  onToggleTechnology,
}: TechnologyListProps) {
  const listTechnologies = technologies.filter((tech) => TECHNOLOGY_CATEGORIES.includes(tech.category))

  return (
    <GlassPanel className="w-80 max-h-full" padding="p-2">
      <div className="space-y-3 max-h-full overflow-y-auto custom-scrollbar p-2">
        {listTechnologies.map((tech) => {
          const isSelected = selectedTechnologies.includes(tech.id)
          const colors = CATEGORY_COLORS[tech.category]

          return (
            <div
              key={tech.id}
              className={cn(
                'relative p-[1px] rounded-lg transition-all duration-300 cursor-pointer',
                isSelected && colors.border,
              )}
              onClick={() => onToggleTechnology(tech.id)}
            >
              <div
                className={cn(
                  'w-full px-4 py-3 rounded-lg backdrop-blur-sm transition-all duration-300',
                  'border-2',
                  isSelected
                    ? `bg-gradient-to-r ${colors.selectedBorder} shadow-md`
                    : 'bg-gradient-to-r from-white/3 to-transparent border-white/15 hover:from-white/8 hover:to-white/3 hover:border-white/25',
                )}
              >
                <span className="text-sm font-medium">{tech.text}</span>
              </div>
            </div>
          )
        })}
      </div>
    </GlassPanel>
  )
}
