import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { GlassButton } from '@/components/ui/glass-button'
import { GlassContainer, GlassBorder, GlassPanel } from '@/components/ui'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PickerItem, PickerCategory } from '../types'
import { CATEGORY_COLORS } from '../constants/categories'

interface ItemPickerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  items: PickerItem[]
  categories: PickerCategory[]
  selectedItems: string[]
  searchTerm: string
  onSearchChange: (value: string) => void
  onToggleItem: (itemId: string) => void
  onAddSelected: () => void
}

export function ItemPicker({
  isOpen,
  onClose,
  title,
  items,
  categories,
  selectedItems,
  searchTerm,
  onSearchChange,
  onToggleItem,
  onAddSelected,
}: ItemPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter items by search term and selected category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl! w-full max-h-[85vh] overflow-hidden bg-black/80 backdrop-blur-xl border border-white/20">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-medium text-white/90">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <GlassBorder rounded="xl">
            <GlassContainer variant="dark" rounded="xl" className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <input
                placeholder="search...."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-xl"
              />
            </GlassContainer>
          </GlassBorder>

          {/* Main Content Area */}
          <div className="flex gap-4 h-[400px]">
            {/* Left Side - Items Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-3 max-h-full overflow-y-auto custom-scrollbar">
                {filteredItems.map((item) => {
                  const isSelected = selectedItems.includes(item.id)
                  const colors =
                    CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.other

                  return (
                    <GlassBorder
                      key={item.id}
                      rounded="lg"
                      variant={isSelected ? 'strong' : 'subtle'}
                      className={cn(
                        'cursor-pointer transition-all duration-300',
                        isSelected && `bg-gradient-to-b ${colors.border}`,
                      )}
                    >
                      <GlassContainer
                        rounded="lg"
                        className={cn(
                          'w-full h-20 flex items-center justify-center p-3',
                          'border hover:border-white/30 transition-all duration-300',
                          isSelected ? `${colors.bg} ${colors.selectedBorder} shadow-lg` : 'hover:bg-white/5',
                        )}
                        onClick={() => onToggleItem(item.id)}
                      >
                        <span
                          className={cn(
                            'text-sm font-medium text-center leading-tight',
                            isSelected ? colors.text : 'text-white/80',
                          )}
                        >
                          {item.text}
                        </span>
                      </GlassContainer>
                    </GlassBorder>
                  )
                })}
              </div>
            </div>

            {/* Right Side - Category Filters */}
            <div className="w-64">
              <GlassPanel className="h-full" padding="p-3">
                <div className="space-y-2 max-h-full overflow-y-auto custom-scrollbar">
                  {/* All Categories Option */}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      'w-full p-3 rounded-lg text-left transition-all duration-200',
                      'border border-white/15 hover:border-white/25',
                      selectedCategory === null
                        ? 'bg-white/20 border-white/30 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-white/80',
                    )}
                  >
                    <span className="font-medium">All Categories</span>
                  </button>

                  {/* Individual Categories */}
                  {categories.map((category) => {
                    const isSelected = selectedCategory === category.id
                    const colors =
                      CATEGORY_COLORS[category.id as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.other

                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                        className={cn(
                          'w-full p-3 rounded-lg text-left transition-all duration-200',
                          'border hover:border-white/25',
                          isSelected
                            ? `${colors.bg} ${colors.selectedBorder} shadow-md`
                            : 'bg-white/5 hover:bg-white/10 border-white/15',
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className={cn('font-medium', isSelected ? colors.text : 'text-white/80')}>
                            {category.name}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </GlassPanel>
            </div>
          </div>

          {/* Selection Actions */}
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-white/70">
              <span className="text-white font-medium">{selectedItems.length}</span> selected
              {selectedCategory && (
                <span className="text-white/50 ml-2">
                  from {categories.find((c) => c.id === selectedCategory)?.name}
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <GlassButton variant="outline" onClick={onClose}>
                Cancel
              </GlassButton>
              <GlassButton variant="primary" onClick={onAddSelected} disabled={selectedItems.length === 0}>
                Add Selected
              </GlassButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
