// src/mirage/types.d.ts
import type { User } from '@/features/users/models/user.model';
import type { Task } from '@/features/tasks/models/task.model';
import 'miragejs';

declare global {
  declare module 'miragejs' {
    export interface ModelRegistry {
      user: User;
      task: Task;
    }
  }
}

export {};
