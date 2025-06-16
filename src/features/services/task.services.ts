import type { Task } from '../tasks/models/task.model'

const API = '/api';
const URL = `${API}/tasks`

async function toJSON<R>(p: Promise<Response>): Promise<R> {
  const res = await p

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw err
  }

  const text = await res.text() 
  console.log('[RAW RESPONSE]', text)

  if (!text) return {} as R

  try {
    return JSON.parse(text)
  } catch (e) {
    console.error('Erreur de parsing JSON:', e)
    throw { error: 'Réponse JSON invalide' }
  }
  
}



/* ─────────── CRUD ─────────── */

export const fetchTasks = async (): Promise<Task[]> => {
  const data = await toJSON<{ tasks: Task[] }>(fetch(URL));
  return data.tasks;
}


export const createTask = (t: Omit<Task, 'id'>) =>
  toJSON<{ task: Task }>(
    fetch(URL, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(t),
    })
  ).then((res) => res.task) // ✅ corrige le bug


/* ➜ signature correcte : id + patch (partiel, sans id) */
export const updateTask = (
  id   : number | string,
  patch: Partial<Omit<Task, 'id'>>
) =>
  toJSON<{ task: Task }>(
    fetch(`${URL}/${id}`, {
      method : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(patch),
    })
  ).then((res) => res.task)


/* DELETE renvoie souvent 204 (pas de body) - on ne parse pas */
export const deleteTask = (id: number | string) =>
  fetch(`${URL}/${id}`, { method: 'DELETE' })
