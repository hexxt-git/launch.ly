import { Plus } from 'lucide-react'

interface AddButtonProps {
  onClick: () => void
}

export function AddButton({ onClick }: AddButtonProps) {
  return (
    <button
      className="flex items-center justify-center px-6 py-2 border-2 border-dashed rounded-xl transition-colors hover:border-white/20 cursor-pointer"
      onClick={onClick}
    >
      <Plus className="h-5 w-5 text-gray-400" />
    </button>
  )
}
