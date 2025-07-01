import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChevronDown, Map, Lightbulb, Pencil, Plus, Folder, Sparkles } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import { useProjects } from './ProjectsContext'
import { format } from 'date-fns'
import { GlassBadge } from '@/components/ui/glass-badge'

const tools = [
  { id: 'idea-generator', name: 'Idea Generator', icon: Lightbulb, path: '/app/tools/idea-generator' },
  { id: 'marketing-writer', name: 'Marketing Writer', icon: Pencil, path: '/app/tools/marketing-writer' },
]

export function Sidebar() {
  const location = useLocation()
  const { projects, isLoading } = useProjects()

  return (
    <div className="m-2 me-1 px-4 py-6 bg-gradient-to-br from-card to-card/50 rounded-lg border-2 border-border/70">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/hexxt-git.png" />
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">HEXXT</p>
          <p className="text-xs text-muted-foreground">hexxt@gmail.com</p>
        </div>
        <Button variant="ghost" size="icon" className="ms-auto">
          <ChevronDown className="size-4" />
        </Button>
      </div>

      <hr className="my-6" />

      <h2 className="font-light mt-8 mb-4 text-muted-foreground">Tools</h2>
      {tools.map((tool) => {
        const IconComponent = tool.icon
        const isSelected = location.pathname === tool.path

        return (
          <Link key={tool.id} to={tool.path}>
            <Button
              variant={isSelected ? 'secondary' : 'ghost'}
              className="w-full text-start justify-start mb-2"
              size="lg"
            >
              <IconComponent className="size-4 me-2" />
              {tool.name}
            </Button>
          </Link>
        )
      })}

      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="font-light text-muted-foreground">Projects</h2>
        <Link to="/app/tools/idea-generator">
          <Button variant="ghost" size="icon">
            <Plus className="size-4" />
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <GlassBadge variant="info">Loading projects...</GlassBadge>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted-foreground">No projects yet</p>
          <Link to="/app/tools/idea-generator">
            <Button variant="ghost" size="sm" className="mt-2 gap-2">
              <Sparkles className="size-4" />
              Generate an Idea
            </Button>
          </Link>
        </div>
      ) : (
        projects.map((project) => {
          const isSelected = location.pathname.includes(project.id)

          return (
            <Link key={project.id} to="/app/projects/$projectId" params={{ projectId: project.id }}>
              <Button
                variant={isSelected ? 'secondary' : 'ghost'}
                className="w-full text-start justify-start mb-2"
                size="lg"
              >
                <Folder className="size-4 me-2" />
                <div className="flex-1 min-w-0">
                  <div className="truncate">{project.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(project.updatedAt), 'MMM d, yyyy')}
                  </div>
                </div>
              </Button>
            </Link>
          )
        })
      )}
    </div>
  )
}
