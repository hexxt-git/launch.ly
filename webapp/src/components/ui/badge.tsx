import * as React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline'
}

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  const base =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
  const variants = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    outline: 'text-foreground border',
  }
  return <div className={`${base} ${variants[variant]} ${className}`} {...props} />
}
