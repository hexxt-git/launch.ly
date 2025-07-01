import { Tag, ModalType } from '../types'
import { TagComponent } from './TagComponent'
import { AddButton } from './AddButton'

interface TagGridProps {
  title: string
  tags: Tag[]
  onRemoveTag: (tagId: string) => void
  onAddClick: () => void
}

export function TagGrid({ title, tags, onRemoveTag, onAddClick }: TagGridProps) {
  return (
    <div className="p-2 md:border-r-2 border-b-2 border-dashed last:border-r-0 md:even:border-r-0 md:nth-last-[2]:border-b-0 last:border-b-0">
      <h3 className="text-xl font-medium mb-4">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <TagComponent key={tag.id} tag={tag} onRemove={() => onRemoveTag(tag.id)} />
        ))}
        <AddButton onClick={onAddClick} />
      </div>
    </div>
  )
}
