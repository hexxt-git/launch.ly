import { createServerFn } from '@tanstack/react-start'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Get or create the counter from database
async function getOrCreateCounter() {
  // Try to get the first counter
  let counter = await prisma.counter.findFirst()

  // If no counter exists, create one with value 0
  if (!counter) {
    counter = await prisma.counter.create({
      data: { value: 0 },
    })
  }

  return counter.value
}

export const getCount = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await getOrCreateCounter()
})

export const updateCount = createServerFn({
  method: 'POST',
})
  .validator(z.literal(-1).or(z.literal(1)))
  .handler(async ({ data }) => {
    // Get or create counter
    let counter = await prisma.counter.findFirst()

    if (!counter) {
      // Create new counter with the increment value
      counter = await prisma.counter.create({
        data: { value: data },
      })
    } else {
      // Update existing counter
      counter = await prisma.counter.update({
        where: { id: counter.id },
        data: { value: counter.value + data },
      })
    }

    return counter.value
  })

export function Counter() {
  const queryClient = useQueryClient()

  // Use TanStack Query to fetch the count
  const {
    data: count,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['count'],
    queryFn: () => getCount(),
  })

  // Use TanStack Query mutation to update the count
  const updateCountMutation = useMutation({
    mutationFn: (increment: -1 | 1) => updateCount({ data: increment }),
    onSuccess: () => {
      // Invalidate and refetch the count query
      queryClient.invalidateQueries({ queryKey: ['count'] })
    },
  })

  if (isLoading)
    return <div className="flex items-center justify-center min-h-screen text-lg">Loading...</div>

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-red-600">
        Error loading count
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Counter App</CardTitle>
          <p className="text-center text-muted-foreground">
            Powered by Tanstack RPC, Prisma & SQLite • Validated with Zod
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-bold text-blue-600">{count}</div>
          <div className="space-y-3">
            <Button
              onClick={() => updateCountMutation.mutate(1)}
              disabled={updateCountMutation.isPending}
              className="w-full"
              size="lg"
            >
              {updateCountMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : (
                `Increment (+1)`
              )}
            </Button>
            <Button
              onClick={() => updateCountMutation.mutate(-1)}
              disabled={updateCountMutation.isPending}
              variant="outline"
              className="w-full"
              size="lg"
            >
              {updateCountMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                  Subtracting...
                </div>
              ) : (
                `Decrement (-1)`
              )}
            </Button>
          </div>
          {updateCountMutation.error && <p className="text-red-600 font-medium">Error updating count</p>}
        </CardContent>
      </Card>
    </div>
  )
}
