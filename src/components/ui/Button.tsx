import { Button as MUIButton } from '@mui/material'
import { cn } from '../../utils/utils'
import { useTheme } from '../../context/useTheme'

type MaterialVariant = 'text' | 'outlined' | 'contained'
type TailwindVariant = 'contained' | 'outlined' | 'ghost'
type ButtonVariant = MaterialVariant | TailwindVariant

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: ButtonVariant
}

export const Button = ({ children, onClick, className, variant = 'contained' }: ButtonProps) => {
  const { theme } = useTheme()

  if (theme === 'material') {
    const safeVariant: MaterialVariant =
      variant === 'ghost' ? 'text' : variant as MaterialVariant

    return (
      <MUIButton variant={safeVariant} onClick={onClick}>
        {children}
      </MUIButton>
    )
  }

  // 💡 TypeScript doit savoir que variant est Tailwind-only ici
  const tailwindVariant = (variant === 'text' ? 'ghost' : variant) as TailwindVariant

  const base = `inline-flex items-center px-4 py-2 text-sm font-medium rounded-md`
  const variants: Record<TailwindVariant, string> = {
    contained: 'bg-blue-600 text-white hover:bg-blue-700',
    outlined: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:underline',
  }

  return (
    <button onClick={onClick} className={cn(base, variants[tailwindVariant], className)}>
      {children}
    </button>
  )
}
