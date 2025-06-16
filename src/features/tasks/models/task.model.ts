export type TaskPriority = 'haute' | 'moyenne' | 'basse'
export type TaskStatus = 'à faire' | 'en cours' | 'terminée'

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  assignedTo: string
}