import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const glassBadgeVariants = cva(
  'inline-flex items-center rounded-full backdrop-blur-sm transition-all duration-300 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br from-white/10 to-transparent ring-white/20 text-white/80',
        primary: 'bg-gradient-to-br from-primary/20 to-primary/10 ring-primary/30 text-primary-foreground/90',
        secondary:
          'bg-gradient-to-br from-secondary/20 to-secondary/10 ring-secondary/30 text-secondary-foreground/90',
        destructive:
          'bg-gradient-to-br from-destructive/20 to-destructive/10 ring-destructive/30 text-destructive-foreground/90',
        success: 'bg-gradient-to-br from-green-500/20 to-green-600/10 ring-green-400/30 text-green-50/90',
        warning: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 ring-yellow-400/30 text-yellow-50/90',
        info: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 ring-blue-400/30 text-blue-50/90',
      },
      size: {
        default: 'px-2.5 py-0.5',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface GlassBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassBadgeVariants> {}

function GlassBadge({ className, variant, size, ...props }: GlassBadgeProps) {
  return <div className={cn(glassBadgeVariants({ variant, size, className }))} {...props} />
}

export { GlassBadge, glassBadgeVariants }
