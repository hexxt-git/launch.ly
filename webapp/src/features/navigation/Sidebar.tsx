import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChevronDown, Map, Lightbulb, Pencil } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'

const tools = [
  { id: 'idea-generator', name: 'Idea Generator', icon: Lightbulb, path: '/app/tools/idea-generator' },
  { id: 'marketing-writer', name: 'Marketing Writer', icon: Pencil, path: '/app/tools/marketing-writer' },
]

const projects = [
  { id: 'project-1', name: 'Idea Generator', path: '/app/projects/project-1' },
  { id: 'project-2', name: 'Hello', path: '/app/projects/project-2' },
  { id: 'project-3', name: 'Brand Campaign', path: '/app/projects/project-3' },
  { id: 'project-4', name: 'Website Redesign', path: '/app/projects/project-4' },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="m-2 me-1 px-4 py-6 bg-card rounded-lg">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">john.doe@example.com</p>
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
              <IconComponent className="size-4" />
              {tool.name}
            </Button>
          </Link>
        )
      })}
      <h2 className="font-light mt-8 mb-4 text-muted-foreground">Projects</h2>
      {projects.map((project) => {
        const isSelected = location.pathname === project.path

        return (
          <Link key={project.id} to={project.path}>
            <Button
              variant={isSelected ? 'secondary' : 'ghost'}
              className="w-full text-start justify-start mb-2"
              size="lg"
            >
              <Map className="size-4" />
              {project.name}
            </Button>
          </Link>
        )
      })}
    </div>
  )
}
