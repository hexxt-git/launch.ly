import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { GlassBorder } from './glass-border'
import { GlassContainer } from './glass-container'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  borderVariant?: 'default' | 'subtle' | 'strong'
  containerVariant?: 'default' | 'dark' | 'light'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  padding?: string
}

export function GlassPanel({
  children,
  className,
  containerClassName,
  borderVariant = 'default',
  containerVariant = 'default',
  rounded = '2xl',
  padding = 'p-4',
}: GlassPanelProps) {
  return (
    <GlassBorder variant={borderVariant} rounded={rounded} className={className}>
      <GlassContainer
        variant={containerVariant}
        rounded={rounded}
        className={cn('h-full', padding, containerClassName)}
      >
        {children}
      </GlassContainer>
    </GlassBorder>
  )
}
