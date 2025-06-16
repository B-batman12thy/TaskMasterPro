// src/main.tsx
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

import { ThemeProvider } from './context/ThemeContext'
import { TaskProvider } from './features/tasks/store'
import { DynamicThemeProvider } from './themes/DynamicThemeProvider'

if (
  import.meta.env.DEV &&
  String(import.meta.env.VITE_USE_REAL_API).toLowerCase() !== 'true'
) {
  console.log('[App] Mirage initialisé ✅')
  import('./mirage/server').then(({ makeServer }) => {
    makeServer()
    startApp()
  })
} else {
  startApp()
}

function startApp() {
  createRoot(document.getElementById('root')!).render(
    
      <ThemeProvider>
         <DynamicThemeProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
        </DynamicThemeProvider>
      </ThemeProvider>
    
  )
}
