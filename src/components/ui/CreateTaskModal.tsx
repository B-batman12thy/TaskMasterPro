// src/components/ui/CreateTaskModal.tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'
import { useTasks } from '@/features/tasks/useTask'
import { createTask } from '@/features/services/task.services'
import type { TaskPriority, TaskStatus } from '@/features/tasks/models/task.model'

interface CreateTaskModalProps {
  open: boolean
  onClose: () => void
}

const users = ['Alice Dupont', 'Jean Martin', 'Sophie Bernard']

export const CreateTaskModal = ({ open, onClose }: CreateTaskModalProps) => {
  const { dispatch } = useTasks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('moyenne')
  const [status, setStatus] = useState<TaskStatus>('\u00e0 faire')
  const [assignedTo, setAssignedTo] = useState(users[0])

  const handleCreate = async () => {
    try {
      const newTask = await createTask({ title, description, priority, status, assignedTo })
      dispatch({ type: 'add', payload: newTask })
      onClose()
      setTitle('')
      setDescription('')
    } catch (err: any) {
      alert(err.error ?? 'Erreur lors de la création')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle Tâche</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)} className="p-2 border rounded-md">
              <option value="haute">Haute</option>
              <option value="moyenne">Moyenne</option>
              <option value="basse">Basse</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} className="p-2 border rounded-md">
              <option value="\u00e0 faire">\u00c0 faire</option>
              <option value="en cours">En cours</option>
              <option value="terminée">Terminée</option>
            </select>
            <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="p-2 border rounded-md">
              {users.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Annuler</Button>
          <Button variant="contained" onClick={handleCreate}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
