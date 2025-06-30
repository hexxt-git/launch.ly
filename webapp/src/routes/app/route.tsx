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
        <div className="pt-14 overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
