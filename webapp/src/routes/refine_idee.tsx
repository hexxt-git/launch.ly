import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { refineIdeaAction } from '../server-fns/refine'
import { GlassPanel } from '@/components/ui/glass-panel'
import { GlassCard } from '@/components/ui/glass-card'
import { GlassBadge } from '@/components/ui/glass-badge'
import { GlassButton } from '@/components/ui/glass-button'

export const Route = createFileRoute('/refine_idee')({
  component: RefineIdeeComponent,
})

type AgentMessage = {
  agentName: string
  message: string
  timestamp: number
}

function RefineIdeeComponent() {
  const [idea, setIdea] = useState('')
  const [messages, setMessages] = useState<AgentMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessages([])
    setError(null)

    try {
      console.log('🚀 Submitting idea for refinement:', idea)
      const response = await refineIdeaAction({ data: { idea } })

      if (!response.ok) throw new Error('Failed to start refinement process')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream available')

      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(Boolean)

        for (const line of lines) {
          const event = JSON.parse(line)

          switch (event.type) {
            case 'agent_message':
              setMessages((prev) => [
                ...prev,
                {
                  agentName: event.agentName,
                  message: event.message,
                  timestamp: Date.now(),
                },
              ])
              break
            case 'error':
              setError(event.message)
              break
            case 'complete':
              // Handle completion if needed
              break
          }
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <GlassPanel className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-white">Startup Idea Refiner</h1>
        <p className="mb-6 text-gray-200">
          Enter your startup idea below and our team of AI agents will analyze, refine, and provide feedback
          in real-time.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            rows={6}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="For example: 'A platform that uses AI to create personalized travel itineraries based on social media activity...'"
          />
          <GlassButton
            type="submit"
            disabled={isLoading || !idea}
            className="w-full py-3 text-lg font-semibold"
          >
            {isLoading ? 'Agents are collaborating...' : 'Refine My Idea'}
          </GlassButton>
        </form>

        {error && (
          <GlassCard wrapperClassName="mt-6" className="p-4 border-red-500/50 bg-red-500/10">
            <p className="text-red-300">Error: {error}</p>
          </GlassCard>
        )}

        {messages.length > 0 && (
          <div className="mt-8 space-y-4 max-h-[600px] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">Agent Collaboration:</h2>
            {messages.map((msg, index) => (
              <GlassCard key={msg.timestamp} className="p-4">
                <div className="flex items-start gap-3">
                  <GlassBadge variant="primary" className="shrink-0">
                    {msg.agentName}
                  </GlassBadge>
                  <p className="text-gray-200 whitespace-pre-wrap">{msg.message}</p>
                </div>
              </GlassCard>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </GlassPanel>
    </div>
  )
}
