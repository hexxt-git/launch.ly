import { Dices } from 'lucide-react'

export function LoadingStep() {
  return (
    <div className="flex flex-col min-h-[400px] items-center justify-center">
      <div className="animate-spin mb-8">
        <Dices className="size-12 text-primary" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-lg font-semibold mb-2">Generating ideas...</div>
        <div className="text-muted-foreground">This may take a few seconds.</div>
      </div>
    </div>
  )
}
