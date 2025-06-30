import * as fs from 'node:fs'
import { createServerFn } from '@tanstack/react-start'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'))
}

export const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

export const updateCount = createServerFn({
  method: 'POST',
})
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
    return count + data // Return the new count
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
    mutationFn: (increment: number) => updateCount({ data: increment }),
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
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">TanStack Query Counter</h1>
        <div className="mb-8">
          <p className="text-lg text-gray-600 mb-2">Current count:</p>
          <div className="text-5xl font-bold text-blue-600">{count}</div>
        </div>
        <button
          type="button"
          onClick={() => updateCountMutation.mutate(1)}
          disabled={updateCountMutation.isPending}
          className={`w-full py-3 px-6 text-lg font-semibold rounded-lg transition-all duration-200 ${
            updateCountMutation.isPending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          } text-white shadow-lg hover:shadow-xl`}
        >
          {updateCountMutation.isPending ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Adding...
            </div>
          ) : (
            `Add 1 to ${count}?`
          )}
        </button>
        {updateCountMutation.error && <p className="mt-4 text-red-600 font-medium">Error updating count</p>}
      </div>
    </div>
  )
}
