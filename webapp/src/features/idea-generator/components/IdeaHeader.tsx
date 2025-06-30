import React from 'react'

interface IdeaHeaderProps {
  title: string
  subtitle?: string
  left?: React.ReactNode
  right?: React.ReactNode
}

export function IdeaHeader({ title, subtitle, left, right }: IdeaHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        {left}
        <div>
          <h1 className="text-3xl font-bold text-gradient-primary mb-1">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="flex-shrink-0 flex gap-2">{right}</div>}
    </div>
  )
}
