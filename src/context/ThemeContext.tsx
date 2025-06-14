import React, { createContext, useState } from 'react'

type ThemeType = 'material' | 'shadcn'

interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('material')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'material' ? 'shadcn' : 'material'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
export default ThemeContext;
