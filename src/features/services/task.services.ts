import type { Task } from "../tasks/models/task.model"

export const getMockTasks = async (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'Corriger les bugs',
          description: 'Corriger tous les bugs critiques avant déploiement',
          priority: 'haute',
          status: 'en cours',
          assignedTo: 'Alice Dupont',
        },
        {
          id: 2,
          title: 'Créer la documentation',
          description: 'Écrire les docs pour le backend',
          priority: 'moyenne',
          status: 'à faire',
          assignedTo: 'Jean Martin',
        },
        {
          id: 3,
          title: 'Revue UX',
          description: 'Analyser les retours utilisateurs',
          priority: 'basse',
          status: 'terminée',
          assignedTo: 'Sophie Bernard',
        },
      ])
    }, 500)
  })
}
