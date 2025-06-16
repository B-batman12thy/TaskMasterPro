# 💡 TaskMaster Pro

**TaskMaster Pro** est une application web de gestion collaborative de tâches. Elle est conçue pour démontrer une architecture frontend avancée avec prise en charge de la thématisation dynamique, d’un backend fictif, et d’un pipeline CI/CD.

---

## 🚀 Fonctionnalités

* 📝 Création, modification, suppression de tâches
* 🧑‍🤝🧑 Assignation de tâches à des utilisateurs fictifs
* 📂 Filtrage des tâches par **priorité** (haute, moyenne, basse) et **statut** (à faire, en cours, terminé)
* 🎨 Système de **switch dynamique entre Material UI et ShadCN**
* 📦 Fake backend avec **MirageJS**
* 💪 Docker ready
* ⚙️ CI/CD avec GitHub Actions

---

## 💪 Stack technique

* React + Vite
* MirageJS
* Context API (TaskStore, ThemeProvider)
* Material UI + ShadCN (thème switchable)
* TypeScript
* Docker
* GitHub Actions

---

## ⚙️ Structure du projet

```
src/
├── App.tsx
├── context/
│   ├── ThemeContext.tsx
│   └── useTheme.ts
├── features/
│   └── tasks/
│       ├── components/
│       │   ├── AddTaskForm.tsx
│       │   ├── TaskCard.tsx
│       │   └── TaskFilters.tsx
│       ├── store/
│       └── useTask.ts
├── mirage/
│   ├── server.ts
│   └── handlers.ts
├── services/
│   └── task.services.ts
├── ui/
│   └── Button.tsx
└── main.tsx
```

---

## ▶️ Lancer l'application en local

### 1. Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/taskmaster-pro.git
cd taskmaster-pro
```

### 2. Installer les dépendances

```bash
yarn install
```

### 3. Lancer le projet

```bash
yarn dev
```

🟢 L'application est accessible sur `http://localhost:5173`

> Le **backend fictif** via MirageJS est automatiquement activé en environnement `development`
> (`VITE_USE_REAL_API=false` par défaut)

---

## 🎨 Changer de thème (Material ↔ ShadCN)

Un bouton dans la barre supérieure permet de basculer dynamiquement entre :

* `Material UI` (composants MUI)
* `ShadCN` (composants Tailwind)

Le composant `Button`, `Input`, `Card` et tous les éléments respectent ce thème.

---

## 🤪 Lancer les tests (optionnel)

```bash
yarn test
```

---

## 📣 Docker

### Build et run

```bash
docker build -t taskmaster-pro .
docker run -p 4173:4173 taskmaster-pro
```

### Fichier `.dockerignore`

```dockerignore
node_modules
dist
.git
.env*
```

---

## ⚙️ CI/CD (GitHub Actions)

Le pipeline CI se trouve dans :

```
.github/workflows/ci.yml
```

Ce workflow effectue :

* L’installation (`yarn install`)
* Le build (`yarn build`)
* Les tests (`yarn test` si existants)

Variables fictives utilisées :

```env
API_URL=https://fakeapi.taskmaster.com
DATABASE_URL=postgres://user:password@localhost:5432/taskmaster
NODE_ENV=production
```

---

## 👥 Utilisateurs fictifs

```json
[
  { "id": 1, "name": "Alice Dupont", "role": "Développeur" },
  { "id": 2, "name": "Jean Martin", "role": "Chef de projet" },
  { "id": 3, "name": "Sophie Bernard", "role": "Designer UX/UI" }
]
```

---

## 📁 Environnement

### .env.local (développement)

```env
VITE_API_URL=/api
VITE_NODE_ENV=development
```

### .env.production

```env
VITE_API_URL=https://fakeapi.taskmaster.com
VITE_NODE_ENV=production
```

---

## 📌 Choix d’architecture

* **MVVM** via composants + hooks + providers
* **SOLID** appliqué à la modularisation des responsabilités
* **YAGNI / KISS** : pas d’abstraction inutile
* **ThemeContext** global pour centraliser la logique de thématisation
* **Fake API** isolée dans `/mirage/` pour remplacement futur simple

