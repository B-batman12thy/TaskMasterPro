
import { useTheme } from "@/context/useTheme"

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 border rounded bg-white shadow hover:bg-gray-50 transition"
    >
      {theme === 'material' ? '💠 Material UI' : '💎 ShadCN'}
    </button>
  )
}
