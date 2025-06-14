import { cn } from "../../../utils/utils"
import type { Task } from "../models/task.model"


interface Props {
  task: Task
}

export const TaskCard = ({ task }: Props) => {
  const priorityColor = {
    haute: 'border-red-500',
    moyenne: 'border-yellow-500',
    basse: 'border-green-500',
  }

  return (
    <div className={cn('border-l-4 p-4 rounded shadow mb-4', priorityColor[task.priority])}>
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="text-xs mt-2 text-gray-500">
        <strong>Statut :</strong> {task.status} • <strong>Assignée à :</strong> {task.assignedTo}
      </div>
    </div>
  )
}
