import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassContainerProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'dark' | 'light'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  onClick?: () => void
}

export function GlassContainer({
  children,
  className,
  variant = 'default',
  rounded = '2xl',
  onClick,
}: GlassContainerProps) {
  const variantClasses = {
    default: 'bg-black/30 backdrop-blur-sm border border-white/10',
    dark: 'bg-black/40 backdrop-blur-sm border border-white/10',
    light: 'bg-white/10 backdrop-blur-sm border border-white/20',
  }

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  }

  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      className={cn(
        'w-full',
        variantClasses[variant],
        roundedClasses[rounded],
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  )
}
