import { createContext, useContext, ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllProjectsAction } from '@/server-fns/projects'

interface Project {
  id: string
  name: string
  description: string | null
  updatedAt: Date
}

interface ProjectsContextType {
  projects: Project[]
  isLoading: boolean
  error: Error | null
  invalidateProjects: () => Promise<void>
}

const ProjectsContext = createContext<ProjectsContextType | null>(null)

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getAllProjectsAction({}),
  })

  const invalidateProjects = async () => {
    await queryClient.invalidateQueries({ queryKey: ['projects'] })
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        isLoading,
        error: error instanceof Error ? error : null,
        invalidateProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }
  return context
}
