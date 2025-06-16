import { useState } from 'react'
import type { TaskPriority, TaskStatus } from '../models/task.model'
import { createTask } from '@/features/services/task.services'
import { useTasks } from '../useTask'


const users = ['Alice Dupont', 'Jean Martin', 'Sophie Bernard']

export const AddTaskForm = () => {
    const { dispatch } = useTasks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('moyenne')
  const [status, setStatus] = useState<TaskStatus>('à faire')
  const [assignedTo, setAssignedTo] = useState(users[0])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const newTask: Task = {
//       id: Date.now(),
//       title,
//       description,
//       priority,
//       status,
//       assignedTo,
//     }
//     dispatch({ type: 'add', payload: newTask })
//     setTitle('')
//     setDescription('')
//   }
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  
    createTask({ title, description, priority, status, assignedTo })
      .then(newTask => dispatch({ type: 'add', payload: newTask }))
      .catch(err => alert(err.error ?? 'Erreur réseau'))
  
    // reset champs
    setTitle('')
    setDescription('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white text-black p-6 rounded-xl shadow-md space-y-4 mb-5"
    >
      <h2 className="text-2xl font-bold text-center">Ajouter une tâche</h2>

      <input
        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Description"
        value={description}
        rows={3}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          className="border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option value="haute">Haute</option>
          <option value="moyenne">Moyenne</option>
          <option value="basse">Basse</option>
        </select>
        <select
          className="border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <option value="à faire">À faire</option>
          <option value="en cours">En cours</option>
          <option value="terminée">Terminée</option>
        </select>
        <select
          className="border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          {users.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md text-sm"
      >
        Ajouter la tâche
      </button>
    </form>
  )
} 
