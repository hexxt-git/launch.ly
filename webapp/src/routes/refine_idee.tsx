import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { refineIdeaAction } from '../server-fns/refine'

export const Route = createFileRoute('/refine_idee')({
  component: RefineIdeeComponent,
})

function RefineIdeeComponent() {
  const [idea, setIdea] = useState('')
  const [result, setResult] = useState<Awaited<ReturnType<typeof refineIdeaAction>> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      console.log('🚀 Submitting idea for refinement:', idea)
      const data = await refineIdeaAction({ data: { idea } })

      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Startup Idea Refiner</h1>
      <p className="mb-6 text-gray-600">
        Enter your startup idea below and our team of AI agents will analyze, refine, and provide feedback.
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          rows={6}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="For example: 'A platform that uses AI to create personalized travel itineraries based on social media activity...'"
        />
        <button
          type="submit"
          disabled={isLoading || !idea}
          className="mt-4 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Agents are collaborating...' : 'Refine My Idea'}
        </button>
      </form>

      {isLoading && <div className="mt-6 text-center text-gray-600">Loading... Please wait.</div>}

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 border border-red-300 rounded-lg">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Agent Collaboration Results:</h2>
          <div className="space-y-4">
            {result.messages.map((msg: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="whitespace-pre-wrap font-mono text-sm text-gray-700">{msg.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
