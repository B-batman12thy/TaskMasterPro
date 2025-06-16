import type { ChangeEvent } from 'react'

export type Status = 'all' | 'à faire' | 'en cours' | 'terminée'
export type Prio   = 'all' | 'haute' | 'moyenne' | 'basse'

interface Props {
  status: Status
  priority: Prio
  onStatusChange: (s: Status) => void
  onPriorityChange: (p: Prio) => void
}

export const TaskFilters = ({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: Props) => {

  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) =>
    onStatusChange(e.target.value as Status)

  const handlePrio = (e: ChangeEvent<HTMLSelectElement>) =>
    onPriorityChange(e.target.value as Prio)

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Filtre statut */}
      <select
        className="border rounded p-2 flex-1"
        value={status}
        onChange={handleStatus}
      >
        <option value="all">Tous les statuts</option>
        <option value="à faire">À faire</option>
        <option value="en cours">En cours</option>
        <option value="terminée">Terminée</option>
      </select>

      {/* Filtre priorité */}
      <select
        className="border rounded p-2 flex-1"
        value={priority}
        onChange={handlePrio}
      >
        <option value="all">Toutes priorités</option>
        <option value="haute">Haute</option>
        <option value="moyenne">Moyenne</option>
        <option value="basse">Basse</option>
      </select>
    </div>
  )
}
