import { createServer, Model, Response } from 'miragejs';

export function makeServer() {
  console.log('[Mirage] Fake server running 🚀');

  createServer({
    models: {
      user: Model,
      task: Model,
    },

    seeds(server) {
      server.create('user', { id: '1', name: 'Alice Dupont', role: 'Développeur' });
      server.create('user', { id: '2', name: 'Jean Martin', role: 'Chef de projet' });
      server.create('user', { id: '3', name: 'Sophie Bernard', role: 'Designer UX/UI' });

      server.create('task', {
        title: 'Corriger des bugs',
        description: 'Fix avant release 🚀',
        priority: 'haute',
        status: 'en cours',
        assignedTo: 'Alice Dupont',
      });
      server.create('task', {

        title: 'Créer la documentation',
        description: 'Rédaction des docs backend',
        priority: 'moyenne',
        status: 'à faire',
        assignedTo: 'Jean Martin',
      });
    },

    routes() {
      this.namespace = 'api';
      this.timing = 400;

      this.get('/tasks', (schema) => {
        return {
          tasks: schema.all('task').models.map((t) => t.attrs),
        };
      });

      this.post('/tasks', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        if (!attrs.title || !attrs.description) {
          return new Response(400, {}, { error: 'Titre et description requis' });
        }
        return { task: schema.db.tasks.insert(attrs) }

      });

      this.patch('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const updates = JSON.parse(request.requestBody);
        const task = schema.find('task', id);
        if (!task) {
          return new Response(404, {}, { error: 'Tâche introuvable' });
        }
        task.update(updates);
        return task;
      });

      this.del('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const task = schema.find('task', id);
        if (!task) {
          return new Response(404, {}, { error: 'Tâche introuvable' });
        }
        task.destroy();
        return new Response(204);
      });

      this.get('/users', (schema) => {
        return {
          users: schema.all('user').models.map((u) => u.attrs),
        };
      });

      this.passthrough((req) => !req.url.includes('/api'));
    },
  });
}
