import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Sidebar } from '@/features/navigation/Sidebar'
import { Header } from '@/features/navigation/Header'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">
      <Sidebar />
      <div className="relative m-2">
        <Header />
        <div className="pt-12 overflow-y-auto h-[calc(100vh-1rem)]">
          <main className="p-4 max-w-4xl">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
