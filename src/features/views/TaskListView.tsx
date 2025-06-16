import { useEffect, useState } from 'react'
import { TaskCard } from '../tasks/components/TaskCard'
import { AddTaskForm } from '../tasks/components/AddTaskForm'
import { TaskFilters, type Prio, type Status,} from '../tasks/components/TaskFilters'
import { fetchTasks } from '../services/task.services'
import { useTasks } from '../tasks/useTask'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export const TaskListView = () => {
  const { tasks, dispatch } = useTasks()
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<Status>('all')
const [prioFilter,   setPrioFilter]   = useState<Prio>('all')

const visibleTasks = tasks.filter(
  t =>
    (statusFilter === 'all' || t.status === statusFilter) &&
    (prioFilter   === 'all' || t.priority === prioFilter)
)

  // Charge le fake backend une fois
  useEffect(() => {
    fetchTasks()
   .then((data) => {
      data.forEach((t) => dispatch({ type: 'add', payload: t }))
      setLoading(false)
    })
       .catch((err) => {
         console.error(err)
        alert(err.error ?? 'Erreur de chargement')
          setLoading(false)
       })
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-start py-12">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">TaskMaster Pro</h2>
        <div className='text-center mb-6'>
        <ThemeSwitcher />
        </div>
        

        {/* plus de prop onAdd */}
        <AddTaskForm />
        <TaskFilters
            status={statusFilter}
            priority={prioFilter}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPrioFilter}
            />

            {loading ? (
          <p className="text-center text-sm text-gray-500">Chargement...</p>
           ) : visibleTasks.length === 0 ? (
          <p className="text-center text-sm text-gray-500 mt-4">Aucune tâche pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-8">
          {visibleTasks.map((task) => (
            <TaskCard key={String(task.id)} task={task} />

          ))}


          </div>
        )}
      </div>
    </div>
  )
}
