import { useCallback, useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getPlannerData,
  createColumn,
  updateColumn,
  deleteColumn,
  createItem,
  updateItem,
  deleteItem,
  generatePlannerTasks,
} from '@/server-fns/planner'

export interface PlannerItem {
  id: string
  projectId: string
  columnId: string
  title: string
  description: string | null
  completed: boolean
  order: number
}

export interface PlannerColumn {
  id: string
  projectId: string
  title: string
  order: number
  items: PlannerItem[]
}

export function usePlanner(projectId: string) {
  const queryClient = useQueryClient()

  // Local state for immediate UI updates
  const [localColumns, setLocalColumns] = useState<PlannerColumn[]>([])
  const [pendingOperations, setPendingOperations] = useState(new Set<string>())

  // Server state
  const {
    data: serverColumns,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['planner', projectId],
    queryFn: () => getPlannerData({ data: { projectId } }),
    refetchOnWindowFocus: false,
  })

  // Sync server state to local state when it changes
  useEffect(() => {
    if (serverColumns) {
      setLocalColumns(serverColumns)
    }
  }, [serverColumns])

  // Add pending operation
  const addPendingOp = (id: string) => {
    setPendingOperations((prev) => new Set([...prev, id]))
  }

  // Remove pending operation
  const removePendingOp = (id: string) => {
    setPendingOperations((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  // Mutations
  const addColumnMutation = useMutation({
    mutationFn: (data: { projectId: string; title: string }) => createColumn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planner', projectId] })
    },
  })

  const editColumnMutation = useMutation({
    mutationFn: (data: { columnId: string; title: string }) => updateColumn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planner', projectId] })
    },
  })

  const removeColumnMutation = useMutation({
    mutationFn: (data: { columnId: string }) => deleteColumn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planner', projectId] })
    },
  })

  const addItemMutation = useMutation({
    mutationFn: (data: { projectId: string; columnId: string; title: string; description?: string }) =>
      createItem({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planner', projectId] })
    },
  })

  const editItemMutation = useMutation({
    mutationFn: (data: { itemId: string; [key: string]: any }) => updateItem({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planner', projectId] })
    },
  })

  const removeItemMutation = useMutation({
    mutationFn: (data: { itemId: string }) => deleteItem({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planner', projectId] })
    },
  })

  const generateTasksMutation = useMutation({
    mutationFn: (data: { projectId: string; projectDescription: string; customPrompt?: string }) =>
      generatePlannerTasks({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planner', projectId] })
    },
  })

  // Operations
  const addColumn = useCallback(
    async (title: string) => {
      const tempId = `temp-${Date.now()}`
      const newColumn: PlannerColumn = {
        id: tempId,
        projectId,
        title,
        order: localColumns.length,
        items: [],
      }

      // Immediate local update
      setLocalColumns((prev) => [...prev, newColumn])
      addPendingOp(tempId)

      try {
        await addColumnMutation.mutateAsync({ projectId, title })
      } catch (error) {
        // Rollback local state
        setLocalColumns((prev) => prev.filter((col) => col.id !== tempId))
        throw error
      } finally {
        removePendingOp(tempId)
      }
    },
    [localColumns.length, projectId, addColumnMutation],
  )

  const editColumn = useCallback(
    async (columnId: string, title: string) => {
      // Immediate local update
      setLocalColumns((prev) => prev.map((col) => (col.id === columnId ? { ...col, title } : col)))
      addPendingOp(columnId)

      try {
        await editColumnMutation.mutateAsync({ columnId, title })
      } catch (error) {
        // Rollback - will be handled by query refetch on error
        throw error
      } finally {
        removePendingOp(columnId)
      }
    },
    [editColumnMutation],
  )

  const removeColumn = useCallback(
    async (columnId: string) => {
      // Immediate local update
      setLocalColumns((prev) => prev.filter((col) => col.id !== columnId))
      addPendingOp(columnId)

      try {
        await removeColumnMutation.mutateAsync({ columnId })
      } catch (error) {
        // Rollback - will be handled by query refetch on error
        throw error
      } finally {
        removePendingOp(columnId)
      }
    },
    [removeColumnMutation],
  )

  const addItem = useCallback(
    async (columnId: string, title: string, description?: string) => {
      const tempId = `temp-${Date.now()}`
      const newItem: PlannerItem = {
        id: tempId,
        projectId,
        columnId,
        title,
        description: description || null,
        completed: false,
        order: localColumns.find((col) => col.id === columnId)?.items.length || 0,
      }

      // Immediate local update
      setLocalColumns((prev) =>
        prev.map((col) => (col.id === columnId ? { ...col, items: [...col.items, newItem] } : col)),
      )
      addPendingOp(tempId)

      try {
        await addItemMutation.mutateAsync({ projectId, columnId, title, description })
      } catch (error) {
        // Rollback local state
        setLocalColumns((prev) =>
          prev.map((col) =>
            col.id === columnId ? { ...col, items: col.items.filter((item) => item.id !== tempId) } : col,
          ),
        )
        throw error
      } finally {
        removePendingOp(tempId)
      }
    },
    [localColumns, projectId, addItemMutation],
  )

  const editItem = useCallback(
    async (itemId: string, updates: Partial<PlannerItem>) => {
      // Immediate local update
      setLocalColumns((prev) =>
        prev.map((col) => ({
          ...col,
          items: col.items.map((item) => (item.id === itemId ? { ...item, ...updates } : item)),
        })),
      )
      addPendingOp(itemId)

      try {
        await editItemMutation.mutateAsync({ itemId, ...updates })
      } catch (error) {
        // Rollback - will be handled by query refetch on error
        throw error
      } finally {
        removePendingOp(itemId)
      }
    },
    [editItemMutation],
  )

  const removeItem = useCallback(
    async (itemId: string) => {
      // Immediate local update
      setLocalColumns((prev) =>
        prev.map((col) => ({
          ...col,
          items: col.items.filter((item) => item.id !== itemId),
        })),
      )
      addPendingOp(itemId)

      try {
        await removeItemMutation.mutateAsync({ itemId })
      } catch (error) {
        // Rollback - will be handled by query refetch on error
        throw error
      } finally {
        removePendingOp(itemId)
      }
    },
    [removeItemMutation],
  )

  const moveItem = useCallback(
    async (itemId: string, destinationColumnId: string, destinationIndex: number) => {
      let movedItem: PlannerItem | undefined

      // Immediate local update
      setLocalColumns((prev) => {
        const newCols = prev.map((col) => ({
          ...col,
          items: col.items.filter((item) => {
            if (item.id === itemId) {
              movedItem = item
              return false
            }
            return true
          }),
        }))

        if (movedItem) {
          return newCols.map((col) => {
            if (col.id === destinationColumnId) {
              const newItems = [...col.items]
              newItems.splice(destinationIndex, 0, {
                ...movedItem!,
                columnId: destinationColumnId,
                order: destinationIndex,
              })
              return {
                ...col,
                items: newItems.map((item, idx) => ({ ...item, order: idx })),
              }
            }
            return col
          })
        }

        return newCols
      })

      addPendingOp(itemId)

      try {
        await editItemMutation.mutateAsync({
          itemId,
          columnId: destinationColumnId,
          order: destinationIndex,
        })
      } catch (error) {
        // Rollback - will be handled by query refetch on error
        throw error
      } finally {
        removePendingOp(itemId)
      }
    },
    [editItemMutation],
  )

  const generateTasks = useCallback(
    async (projectDescription: string, customPrompt?: string) => {
      try {
        await generateTasksMutation.mutateAsync({
          projectId,
          projectDescription,
          customPrompt,
        })
      } catch (error) {
        throw error
      }
    },
    [projectId, generateTasksMutation],
  )

  return {
    columns: localColumns,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    pendingOperations,
    addColumn,
    editColumn,
    removeColumn,
    addItem,
    editItem,
    removeItem,
    moveItem,
    generateTasks,
  }
}
