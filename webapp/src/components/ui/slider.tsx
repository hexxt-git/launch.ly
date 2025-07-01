import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  value: number[]
  onValueChange: (value: number[]) => void
}

function Slider({ className, value, onValueChange, ...props }: SliderProps) {
  return (
    <input
      type="range"
      className={cn('w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider', className)}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      {...props}
    />
  )
}

export { Slider }
