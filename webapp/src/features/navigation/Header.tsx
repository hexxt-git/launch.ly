import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function Header() {
  return (
    <div className="absolute top-0 left-0 right-0 px-4 pb-6 pt-2 bg-gradient-to-b from-background to-transparent from-25% to-100% rounded-md flex justify-end items-center gap-2 z-100">
      <Button variant="ghost" size="icon">
        <Plus className="size-4" />
      </Button>
      <Avatar>
        <AvatarImage src="https://github.com/hexxt-git.png" />
      </Avatar>
    </div>
  )
}
