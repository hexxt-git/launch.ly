import { createFileRoute } from '@tanstack/react-router'
import { Counter } from '../features/counter'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <Counter />
}
