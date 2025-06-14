// src/features/tasks/views/TaskListView.tsx
import { useEffect, useState } from 'react'
import type { Task } from '../tasks/models/task.model'
import { getMockTasks } from '../services/task.services'
import { TaskCard } from '../tasks/components/TaskCard'


export const TaskListView = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMockTasks().then((data) => {
      setTasks(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des tâches</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  )
}
