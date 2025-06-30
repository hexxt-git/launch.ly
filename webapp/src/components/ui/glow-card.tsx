import * as React from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string
}

function GlowCard({ className, containerClassName, children, ...props }: GlowCardProps) {
  return (
    <div
      className={cn(
        'relative p-[1px] rounded-lg bg-gradient-to-b from-glass-border-light to-primary to-50% transition-all duration-300',
        containerClassName,
      )}
    >
      <div
        className={cn('relative rounded-lg backdrop-blur-sm p-6 h-full w-full overflow-hidden', className)}
        style={{
          background: `
            radial-gradient(circle at center top, var(--glass-overlay-heavy) 0%, var(--primary) 100%),
            linear-gradient(to bottom, var(--glass-overlay-light) 30%, var(--primary) 100%)
          `,
          backgroundBlendMode: 'multiply',
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

export { GlowCard }
