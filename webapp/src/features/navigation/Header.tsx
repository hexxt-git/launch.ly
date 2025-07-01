import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <div className="absolute top-0 left-0 right-0 px-4 pb-6 pt-2 bg-gradient-to-b from-background to-transparent from-25% to-100% rounded-md flex justify-end items-center gap-2 z-100">
      <Link to="/app/tools/idea-generator">
        <Button variant="ghost" size="icon">
          <Plus className="size-4" />
        </Button>
      </Link>
      <a href="https://github.com/hexxt-git" target="_blank">
        <Avatar>
          <AvatarImage src="https://github.com/hexxt-git.png" />
        </Avatar>
      </a>
    </div>
  )
}
