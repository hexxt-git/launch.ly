import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const glassButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer overflow-hidden backdrop-blur-sm w-full!",
  {
    variants: {
      variant: {
        default: 'text-primary-foreground shadow-xs',
        primary: 'text-primary-foreground shadow-xs',
        secondary: 'text-secondary-foreground shadow-xs',
        destructive: 'text-destructive-foreground shadow-xs',
        outline: 'text-foreground border border-white/20 shadow-xs hover:border-white/30',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

// Define variant-specific styles
const getVariantStyles = (variant: string | null | undefined) => {
  switch (variant) {
    case 'primary':
      return {
        borderGradient:
          'from-glass-border-light to-primary to-50% hover:from-glass-border-heavy hover:to-primary',
        background: `
          radial-gradient(circle at center top, var(--glass-overlay-heavy) 0%, var(--primary) 100%),
          linear-gradient(to bottom, var(--glass-overlay-medium) 30%, var(--primary) 100%)
        `,
        hoverBackground: `
          radial-gradient(circle at center top, var(--glass-overlay-heavy) 0%, var(--primary) 100%),
          linear-gradient(to bottom, var(--glass-overlay-heavy) 30%, var(--primary) 100%)
        `,
        textShadow: '0 1px 4px rgba(0,0,0,0.4)',
      }
    case 'secondary':
      return {
        borderGradient:
          'from-glass-border-light to-secondary to-50% hover:from-glass-border-heavy hover:to-secondary',
        background: `
          radial-gradient(circle at center top, var(--glass-overlay-medium) 0%, var(--secondary) 100%),
          linear-gradient(to bottom, var(--glass-overlay-light) 30%, var(--secondary) 100%)
        `,
        hoverBackground: `
          radial-gradient(circle at center top, var(--glass-overlay-heavy) 0%, var(--secondary) 100%),
          linear-gradient(to bottom, var(--glass-overlay-medium) 30%, var(--secondary) 100%)
        `,
        textShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }
    case 'destructive':
      return {
        borderGradient:
          'from-glass-border-light to-destructive to-50% hover:from-glass-border-heavy hover:to-destructive',
        background: `
          radial-gradient(circle at center top, var(--glass-overlay-heavy) 0%, var(--destructive) 100%),
          linear-gradient(to bottom, var(--glass-overlay-light) 30%, var(--destructive) 100%)
        `,
        hoverBackground: `
          radial-gradient(circle at center top, var(--glass-overlay-heavy) 0%, var(--destructive) 100%),
          linear-gradient(to bottom, var(--glass-overlay-heavy) 30%, var(--destructive) 100%)
        `,
        textShadow: '0 1px 4px rgba(0,0,0,0.4)',
      }
    case 'outline':
      return {
        borderGradient:
          'from-glass-border-light to-transparent to-50% hover:from-glass-border-heavy hover:to-glass-overlay-light',
        background: `
          radial-gradient(circle at center top, var(--glass-overlay-light) 0%, transparent 100%),
          linear-gradient(to bottom, var(--glass-overlay-light) 30%, transparent 100%)
        `,
        hoverBackground: `
          radial-gradient(circle at center top, var(--glass-overlay-medium) 0%, var(--glass-overlay-light) 100%),
          linear-gradient(to bottom, var(--glass-overlay-medium) 30%, var(--glass-overlay-light) 100%)
        `,
        textShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }
    case 'default':
    default:
      return {
        borderGradient:
          'from-glass-border-light to-primary to-50% hover:from-glass-border-heavy hover:to-primary',
        background: `
          radial-gradient(circle at center top, var(--glass-overlay-heavy) 0%, var(--primary) 100%),
          linear-gradient(to bottom, var(--glass-overlay-light) 30%, var(--primary) 100%)
        `,
        hoverBackground: `
          radial-gradient(circle at center top, var(--glass-overlay-heavy) 0%, var(--primary) 100%),
          linear-gradient(to bottom, var(--glass-overlay-heavy) 30%, var(--primary) 100%)
        `,
        textShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }
  }
}

function GlassButton({
  className,
  containerClassName,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof glassButtonVariants> & {
    asChild?: boolean
    containerClassName?: string
  }) {
  const Comp = asChild ? Slot : 'button'
  const variantStyles = getVariantStyles(variant)

  return (
    <div
      className={cn(
        'relative p-[1px] rounded-md bg-gradient-to-b transition-all duration-300',
        variantStyles.borderGradient,
        containerClassName,
      )}
    >
      <Comp
        data-slot="glass-button"
        className={cn(glassButtonVariants({ variant, size, className }))}
        style={
          {
            background: variantStyles.background,
            backgroundBlendMode: 'multiply',
            textShadow: variantStyles.textShadow,
            '--hover-bg': variantStyles.hoverBackground,
          } as React.CSSProperties & { '--hover-bg': string }
        }
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLElement
          target.style.background = variantStyles.hoverBackground
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLElement
          target.style.background = variantStyles.background
        }}
        {...props}
      />
    </div>
  )
}

export { GlassButton, glassButtonVariants }
