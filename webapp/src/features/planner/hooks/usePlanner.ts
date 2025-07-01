import { useState, useEffect, useCallback } from 'react'
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

export type PlannerItem = {
  id: string
  title: string
  description: string | null
  completed: boolean
  order: number
  columnId: string
  projectId: string
}

export type PlannerColumn = {
  id: string
  title: string
  order: number
  projectId: string
  items: PlannerItem[]
}

export function usePlanner(projectId: string) {
  const [columns, setColumns] = useState<PlannerColumn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlannerData = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getPlannerData({ data: { projectId } })
      setColumns(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch planner data')
    } finally {
      setLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    fetchPlannerData()
  }, [fetchPlannerData])

  const addColumn = async (title: string) => {
    try {
      const newColumn = await createColumn({
        data: { projectId, title },
      })
      setColumns((prev) => [...prev, newColumn])
      return newColumn
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create column')
      throw err
    }
  }

  const editColumn = async (columnId: string, title: string) => {
    try {
      const updatedColumn = await updateColumn({
        data: { columnId, title },
      })
      setColumns((prev) => prev.map((col) => (col.id === columnId ? updatedColumn : col)))
      return updatedColumn
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update column')
      throw err
    }
  }

  const removeColumn = async (columnId: string) => {
    try {
      await deleteColumn({ data: { columnId } })
      setColumns((prev) => prev.filter((col) => col.id !== columnId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete column')
      throw err
    }
  }

  const addItem = async (columnId: string, title: string, description?: string) => {
    try {
      const newItem = await createItem({
        data: { projectId, columnId, title, description },
      })
      setColumns((prev) =>
        prev.map((col) => (col.id === columnId ? { ...col, items: [...col.items, newItem] } : col)),
      )
      return newItem
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item')
      throw err
    }
  }

  const editItem = async (
    itemId: string,
    updates: {
      title?: string
      description?: string
      completed?: boolean
      columnId?: string
      order?: number
    },
  ) => {
    try {
      const updatedItem = await updateItem({
        data: { itemId, ...updates },
      })

      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          items: col.items
            .map((item) => (item.id === itemId ? updatedItem : item))
            .filter((item) => (updates.columnId ? item.columnId === col.id : true)),
        })),
      )

      // If moving to a different column, add to new column
      if (updates.columnId) {
        setColumns((prev) =>
          prev.map((col) =>
            col.id === updates.columnId && !col.items.find((item) => item.id === itemId)
              ? { ...col, items: [...col.items, updatedItem].sort((a, b) => a.order - b.order) }
              : col,
          ),
        )
      }

      return updatedItem
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item')
      throw err
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      await deleteItem({ data: { itemId } })
      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          items: col.items.filter((item) => item.id !== itemId),
        })),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item')
      throw err
    }
  }

  const generateTasks = async (projectDescription: string, customPrompt?: string) => {
    try {
      setLoading(true)
      const result = await generatePlannerTasks({
        data: { projectId, projectDescription, customPrompt },
      })

      if (result.success) {
        await fetchPlannerData() // Refresh data
        return result
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate tasks')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const moveItem = (itemId: string, destinationColumnId: string, destinationIndex: number) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns]

      // Find source column and item
      let sourceColumn: PlannerColumn | null = null
      let itemToMove: PlannerItem | null = null
      let sourceIndex = -1

      for (const column of newColumns) {
        sourceIndex = column.items.findIndex((item) => item.id === itemId)
        if (sourceIndex !== -1) {
          sourceColumn = column
          itemToMove = column.items[sourceIndex]
          break
        }
      }

      if (!sourceColumn || !itemToMove) return prevColumns

      // Remove item from source column
      sourceColumn.items.splice(sourceIndex, 1)

      // Find destination column
      const destColumn = newColumns.find((col) => col.id === destinationColumnId)
      if (!destColumn) return prevColumns

      // Add item to destination column
      destColumn.items.splice(destinationIndex, 0, {
        ...itemToMove,
        columnId: destinationColumnId,
      })

      // Update orders for affected columns
      sourceColumn.items.forEach((item, index) => {
        item.order = index
      })

      destColumn.items.forEach((item, index) => {
        item.order = index
      })

      return newColumns
    })

    // Update in database (fire and forget for now)
    editItem(itemId, {
      columnId: destinationColumnId,
      order: destinationIndex,
    }).catch(console.error)
  }

  return {
    columns,
    loading,
    error,
    addColumn,
    editColumn,
    removeColumn,
    addItem,
    editItem,
    removeItem,
    generateTasks,
    moveItem,
    refetch: fetchPlannerData,
  }
}
