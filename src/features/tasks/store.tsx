import { createContext, useReducer } from 'react'
import type { Task } from './models/task.model'

type Action =
  | { type: 'add'; payload: Task }
  | { type: 'update'; payload: Task }
  | { type: 'delete'; payload: string }

function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'add':
      return [action.payload, ...state]
    case 'update':
      return state.map((t) =>
        t.id === action.payload.id ? action.payload : t
      )
    case 'delete':
      return state.filter((t) => t.id !== action.payload)
    default:
      return state
  }
}

const TasksContext = createContext<{
  tasks: Task[]
  dispatch: React.Dispatch<Action>
}>({ tasks: [], dispatch: () => {} })

export const TaskProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [tasks, dispatch] = useReducer(taskReducer, [])
  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  )
}


export const TaskCtx = TasksContext;