// src/features/tasks/components/TaskCard.tsx
import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import type { Task } from '../models/task.model'
import { EditTaskModal } from './EditTaskModal'
import { useTasks } from '../useTask'

export const TaskCard = ({ task }: { task: Task }) => {
  const { dispatch } = useTasks()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 🪵 log pour debug visuel
    // console.log('[TaskCard]', task)
  }, [task])

  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow relative">
        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-2 text-gray-400">
          <button onClick={() => setIsOpen(true)}>
            <Pencil size={18} />
          </button>
          <button
            onClick={() =>
              dispatch({ type: 'delete', payload: String(task.id) })
            }
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Contenu */}
        <h3 className="text-lg font-bold mb-1">{task.title ?? '[Sans titre]'}</h3>
        <p className="text-sm text-gray-600 mb-3">{task.description ?? '[Aucune description]'}</p>

        <p className="text-xs">
          <strong>Statut :</strong> {task.status} •{' '}
          <strong>Assignée à :</strong> {task.assignedTo}
        </p>
      </div>

      {isOpen && (
        <EditTaskModal task={task} close={() => setIsOpen(false)} />
      )}
    </>
  )
}
