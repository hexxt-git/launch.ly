import { IdeaAnalytics as IdeaAnalyticsType } from '../types'
import { GlassPanel } from '@/components/ui'
import { cn } from '@/lib/utils'

interface IdeaAnalyticsProps {
  analytics: IdeaAnalyticsType
}

export function IdeaAnalytics({ analytics }: IdeaAnalyticsProps) {
  const metrics = [
    { key: 'profitability', label: 'Profit', color: 'text-green-400' },
    { key: 'marketability', label: 'Market', color: 'text-blue-400' },
    { key: 'feasibility', label: 'Feasible', color: 'text-purple-400' },
    { key: 'innovation', label: 'Innovation', color: 'text-orange-400' },
    { key: 'scalability', label: 'Scale', color: 'text-pink-400' },
  ] as const

  return (
    <div className="grid grid-cols-5 gap-2">
      {metrics.map(({ key, label, color }) => (
        <div key={key} className="flex flex-col items-center">
          <span className={cn('text-3xl font-bold', color)}>{analytics[key]}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}
