import { useState } from 'react'
import type { Task, TaskPriority, TaskStatus } from '../models/task.model'
import { updateTask } from '@/features/services/task.services'
import { useTasks } from '../useTask'

const users = ['Alice Dupont', 'Jean Martin', 'Sophie Bernard']

export const EditTaskModal = ({
  task,
  close,
}: {
  task: Task
  close: () => void
}) => {
  const { dispatch } = useTasks()

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState<TaskPriority>(task.priority)
  const [status, setStatus] = useState<TaskStatus>(task.status)
  const [assignedTo, setAssignedTo] = useState(task.assignedTo)

//   const save = () => {
//     dispatch({
//       type: 'update',
//       payload: {
//         ...task,
//         title,
//         description,
//         priority,
//         status,
//         assignedTo,
//       },
//     })
//     close()
//   }
const save = () => {
     updateTask(task.id, {
       title,
        description,
       priority,
        status,
        assignedTo,
      })
        .then((updated) =>
          dispatch({ type: 'update', payload: updated })
        )
        .then(close)                // ferme la modal quand c’est OK
       .catch((err) =>
         alert(err.error ?? 'Erreur de mise à jour')
        )
    }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">Modifier la tâche</h2>

        <input
          className="w-full border rounded p-2"
          value={title}
          placeholder='Titre'
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            className="border rounded p-2"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as TaskPriority)
            }
          >
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>

          <select
            className="border rounded p-2"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as TaskStatus)
            }
          >
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminée">Terminée</option>
          </select>

          <select
            className="border rounded p-2"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            {users.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={close}
          >
            Annuler
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={save}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}
