import { cn } from '@/lib/utils'
import { Lightbulb, Sparkles, Target, Shield, Zap, Rocket, Crown, DollarSign, BadgeIcon } from 'lucide-react'
import { GlassBorder } from '@/components/ui/glass-border'
import { GlassContainer } from '@/components/ui/glass-container'
import { Settings } from '../types'

interface SettingsSectionProps {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
}

export function SettingsSection({ settings, onSettingsChange }: SettingsSectionProps) {
  const settingsConfig = [
    {
      key: 'profitability' as const,
      title: 'Profitability Level',
      icon: Lightbulb,
      options: [
        {
          key: 'low' as const,
          label: 'Low',
          description: 'Low risk, low reward',
          icon: BadgeIcon,
          color: 'purple',
        },
        {
          key: 'medium' as const,
          label: 'Medium',
          description: 'Solid Income, nothing revolutionary',
          icon: DollarSign,
          color: 'green',
        },
        {
          key: 'high' as const,
          label: 'High',
          description: 'High risk, high reward',
          icon: Crown,
          color: 'blue',
        },
      ],
    },
    {
      key: 'novelty' as const,
      title: 'Novelty Factor',
      icon: Sparkles,
      options: [
        {
          key: 'familiar' as const,
          label: 'Familiar',
          description: 'Build on existing concepts',
          icon: Shield,
          color: 'purple',
        },
        {
          key: 'fresh' as const,
          label: 'Fresh',
          description: 'New twists on known ideas',
          icon: Sparkles,
          color: 'green',
        },
        {
          key: 'revolutionary' as const,
          label: 'Revolutionary',
          description: 'Completely novel approaches',
          icon: Rocket,
          color: 'blue',
        },
      ],
    },
    {
      key: 'feasibility' as const,
      title: 'Feasibility Focus',
      icon: Target,
      options: [
        {
          key: 'practical' as const,
          label: 'Practical',
          description: 'Ready to build today',
          icon: Shield,
          color: 'purple',
        },
        {
          key: 'realistic' as const,
          label: 'Realistic',
          description: 'Achievable with effort',
          icon: Target,
          color: 'green',
        },
        {
          key: 'ambitious' as const,
          label: 'Ambitious',
          description: 'Dream big, worry later',
          icon: Rocket,
          color: 'blue',
        },
      ],
    },
  ]

  const colorClasses = {
    blue: {
      border: 'from-blue-500/50 to-blue-600/30',
      bg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-400/30 shadow-lg shadow-blue-500/10',
      icon: 'text-blue-400',
    },
    green: {
      border: 'from-green-500/50 to-green-600/30',
      bg: 'bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-400/30 shadow-lg shadow-green-500/10',
      icon: 'text-green-400',
    },
    purple: {
      border: 'from-purple-500/50 to-purple-600/30',
      bg: 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-400/30 shadow-lg shadow-purple-500/10',
      icon: 'text-purple-400',
    },
  }

  return (
    <div className="space-y-8">
      {settingsConfig.map((setting) => {
        const TitleIcon = setting.icon
        return (
          <div key={setting.key}>
            <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
              <TitleIcon className="h-5 w-5" />
              {setting.title}
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {setting.options.map((option) => {
                const OptionIcon = option.icon
                const isSelected = settings[setting.key] === option.key
                const colors = colorClasses[option.color as keyof typeof colorClasses]

                return (
                  <GlassBorder
                    key={option.key}
                    rounded="xl"
                    variant={isSelected ? 'strong' : 'subtle'}
                    className={cn(
                      'transition-all duration-300',
                      isSelected && `bg-gradient-to-b ${colors.border}`,
                    )}
                  >
                    <GlassContainer
                      rounded="xl"
                      className={cn(
                        'p-4 cursor-pointer transition-all duration-300 text-left h-full',
                        'border border-white/10 hover:border-white/20',
                        isSelected ? colors.bg : 'hover:bg-white/5',
                      )}
                      onClick={() => onSettingsChange({ ...settings, [setting.key]: option.key })}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <OptionIcon className={cn('h-5 w-5', isSelected ? colors.icon : 'text-gray-400')} />
                        <span className="font-medium text-shadow-sm">{option.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </GlassContainer>
                  </GlassBorder>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
