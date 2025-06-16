import { useContext } from 'react'
import { TaskCtx } from './store'

export const useTasks = () => {
  const ctx = useContext(TaskCtx)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}
