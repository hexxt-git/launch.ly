import { GlassCard } from '@/components/ui/glass-card'
import { GlassBadge } from '@/components/ui/glass-badge'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { AGENT_PROFILES, AgentType } from '../constants/agents'
import { cn } from '@/lib/utils'

interface AgentMessageProps {
  agentName: AgentType
  message: string
  isLast?: boolean
  isOpen: boolean
  onToggle: () => void
}

export function AgentMessage({ agentName, message, isLast, isOpen, onToggle }: AgentMessageProps) {
  const agent = AGENT_PROFILES[agentName]

  if (!agent) {
    return null
  }

  const Icon = agent.icon

  return (
    <div className="relative">
      {/* Agent Timeline Line */}
      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-white/10" />

      <GlassCard
        className={cn('p-4 transition-all duration-200 hover:bg-white/5', !isOpen && 'cursor-pointer')}
        onClick={() => !isOpen && onToggle()}
      >
        <div className="flex items-start gap-4">
          {/* Agent Icon */}
          <div
            className={cn(
              'relative z-10 flex size-12 items-center justify-center rounded-full bg-white/5 p-2',
              agent.color,
            )}
          >
            <Icon className="size-6" />
          </div>

          <div className="flex-1 space-y-2">
            {/* Agent Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{agentName}</h3>
                <GlassBadge variant="secondary" size="sm">
                  {agent.description}
                </GlassBadge>
              </div>
              {isOpen && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggle()
                  }}
                  className="text-white/60 hover:text-white"
                >
                  <ChevronUp className="size-5" />
                </button>
              )}
              {!isOpen && (
                <button className="text-white/60 hover:text-white">
                  <ChevronDown className="size-5" />
                </button>
              )}
            </div>

            {/* Agent Message */}
            {isOpen ? (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{message}</ReactMarkdown>
              </div>
            ) : (
              <p className="line-clamp-3 text-sm text-white/60">
                {message.split(/\n+/g).map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
