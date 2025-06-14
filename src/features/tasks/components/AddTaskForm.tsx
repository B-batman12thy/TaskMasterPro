import { useState } from 'react'
import type { Task, TaskPriority, TaskStatus } from '../models/task.model'
import { useTheme } from '../../../context/useTheme'

interface Props {
  onAdd: (task: Task) => void
}

const users = ['Alice Dupont', 'Jean Martin', 'Sophie Bernard']

export const AddTaskForm = ({ onAdd }: Props) => {
  const { theme } = useTheme()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('moyenne')
  const [status, setStatus] = useState<TaskStatus>('à faire')
  const [assignedTo, setAssignedTo] = useState(users[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      priority,
      status,
      assignedTo,
    }
    onAdd(newTask)
    setTitle('')
    setDescription('')
  }

  const isMaterial = theme === 'material'

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input
        className="w-full border rounded p-2"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-4">
        <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)} className="border p-2 rounded">
          <option value="haute">Haute</option>
          <option value="moyenne">Moyenne</option>
          <option value="basse">Basse</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} className="border p-2 rounded">
          <option value="à faire">À faire</option>
          <option value="en cours">En cours</option>
          <option value="terminée">Terminée</option>
        </select>
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="border p-2 rounded">
          {users.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Ajouter la tâche
      </button>
    </form>
  )
}
