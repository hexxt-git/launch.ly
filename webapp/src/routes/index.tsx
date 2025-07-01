import { GlassButton } from '@/components/ui'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Link to="/app/projects">
          <GlassButton variant="secondary">Projects</GlassButton>
        </Link>
        <Link to="/app">
          <GlassButton>New Idea</GlassButton>
        </Link>
      </div>
    </div>
  )
}
