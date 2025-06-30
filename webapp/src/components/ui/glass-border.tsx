import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassBorderProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'subtle' | 'strong'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  padding?: boolean
}

export function GlassBorder({
  children,
  className,
  variant = 'default',
  rounded = '2xl',
  padding = true,
}: GlassBorderProps) {
  const variantClasses = {
    default: 'bg-gradient-to-b from-white/20 to-white/5',
    subtle: 'bg-gradient-to-b from-white/10 to-white/5',
    strong: 'bg-gradient-to-b from-white/30 to-white/10',
  }

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        variantClasses[variant],
        roundedClasses[rounded],
        padding && 'p-[1px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
