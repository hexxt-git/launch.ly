import { cn } from '@/lib/utils'
import { TechnologyTag } from '../types'
import { CATEGORY_COLORS, CAPABILITY_CATEGORIES } from '../constants/categories'
import { GlassBorder } from '@/components/ui/glass-border'
import { GlassContainer } from '@/components/ui/glass-container'

interface TechnologyGridProps {
  technologies: TechnologyTag[]
  selectedTechnologies: string[]
  onToggleTechnology: (techId: string) => void
}

export function TechnologyGrid({
  technologies,
  selectedTechnologies,
  onToggleTechnology,
}: TechnologyGridProps) {
  const capabilityTechnologies = technologies.filter((tech) => CAPABILITY_CATEGORIES.includes(tech.category))

  return (
    <div className="flex-1 grid grid-cols-3 gap-2 max-h-full overflow-y-auto pr-2 custom-scrollbar">
      {capabilityTechnologies.map((tech) => {
        const isSelected = selectedTechnologies.includes(tech.id)
        const colors = CATEGORY_COLORS[tech.category]

        return (
          <GlassBorder
            key={tech.id}
            rounded="xl"
            variant={isSelected ? 'strong' : 'subtle'}
            className={cn(
              'cursor-pointer transition-all duration-300',
              isSelected && `bg-gradient-to-b ${colors.border}`,
            )}
          >
            <GlassContainer
              rounded="xl"
              className={cn(
                'w-full h-20 flex items-center justify-center p-3',
                'border hover:border-white/30 transition-all duration-300',
                isSelected
                  ? `bg-gradient-to-br ${colors.bg} ${colors.selectedBorder} shadow-lg`
                  : 'hover:bg-white/5',
              )}
              onClick={() => onToggleTechnology(tech.id)}
            >
              <span
                className={cn(
                  'text-sm font-medium text-center leading-tight',
                  isSelected ? colors.text : 'text-white/80',
                )}
              >
                {tech.text}
              </span>
            </GlassContainer>
          </GlassBorder>
        )
      })}
    </div>
  )
}
