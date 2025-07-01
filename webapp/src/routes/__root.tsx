/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import '../global.css'
import { Toaster } from '@/components/ui/sonner'
import { ProjectsProvider } from '@/features/navigation/ProjectsContext'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const splash = document.getElementById('splash-screen')
      if (splash) splash.remove()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <ProjectsProvider>
          <Outlet />
          <Toaster />
        </ProjectsProvider>
      </QueryClientProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <div
          id="splash-screen"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '20px',
            zIndex: 9999,
          }}
        >
          Loading...
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
