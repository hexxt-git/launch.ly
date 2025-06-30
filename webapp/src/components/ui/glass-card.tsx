import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const glassCardVariants = cva(
  'w-full backdrop-blur-sm transition-all duration-300 text-left border border-white/10 hover:border-white/20',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br from-white/5 to-transparent hover:from-white/10 hover:to-white/5',
        blue: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-400/30 shadow-lg shadow-blue-500/10',
        green:
          'bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-400/30 shadow-lg shadow-green-500/10',
        purple:
          'bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-400/30 shadow-lg shadow-purple-500/10',
        orange:
          'bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-400/30 shadow-lg shadow-orange-500/10',
        red: 'bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-400/30 shadow-lg shadow-red-500/10',
        pink: 'bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-pink-400/30 shadow-lg shadow-pink-500/10',
      },
      size: {
        sm: 'p-3 rounded-lg',
        default: 'p-4 rounded-xl',
        lg: 'p-6 rounded-xl',
        xl: 'p-8 rounded-2xl',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-lg transition-shadow',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      interactive: false,
    },
  },
)

const glassCardWrapperVariants = cva('relative p-[1px] bg-gradient-to-b transition-all duration-300', {
  variants: {
    variant: {
      default: 'from-white/10 to-white/5 hover:from-white/20 hover:to-white/10',
      blue: 'from-blue-500/50 to-blue-600/30',
      green: 'from-green-500/50 to-green-600/30',
      purple: 'from-purple-500/50 to-purple-600/30',
      orange: 'from-orange-500/50 to-orange-600/30',
      red: 'from-red-500/50 to-red-600/30',
      pink: 'from-pink-500/50 to-pink-600/30',
    },
    size: {
      sm: 'rounded-lg',
      default: 'rounded-xl',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  asChild?: boolean
  wrapperClassName?: string
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, wrapperClassName, variant, size, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : 'div'

    const content = (
      <div
        className={cn('size-full', glassCardVariants({ variant, size, interactive, className }))}
        ref={ref}
        {...props}
      />
    )

    if (asChild) {
      return content
    }

    return <div className={cn(glassCardWrapperVariants({ variant, size }), wrapperClassName)}>{content}</div>
  },
)

GlassCard.displayName = 'GlassCard'

export { GlassCard, glassCardVariants }
