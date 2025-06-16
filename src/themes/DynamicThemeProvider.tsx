// src/themes/DynamicThemeProvider.tsx
import { ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useTheme } from '@/context/useTheme'

// MUI Theme config
const materialTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e40af', // bleu foncé
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
})

export const DynamicThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme()

  if (theme === 'material') {
    return (
      <MuiThemeProvider theme={materialTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    )
  }

  // ShadCN utilise souvent Tailwind donc aucun provider global n'est nécessaire
  return <>{children}</>
}
