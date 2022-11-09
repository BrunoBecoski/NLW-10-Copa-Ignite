import { ButtonHTMLAttributes, ReactNode } from 'react'
import { CircleNotch } from 'phosphor-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: 'PRIMARY' | 'SECONDARY';
}

export function Button({
  children,
  isLoading = false,
  variant = 'PRIMARY',
  ...rest

}: ButtonProps ) {
  return (
    <button
      className={`w-full mt-4 px-6 py-4 flex items-center justify-center gap-3 font-bold text-sm uppercase rounded disabled:opacity-50 disabled:cursor-not-allowed
        ${ variant === 'PRIMARY' 
          ?
            'text-gray-950 bg-yellow-500 enabled:hover:bg-yellow-700'
          :
            'text-gray-100 bg-red-500 enabled:hover:bg-red-700 '
        }
      `}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading 
          ?
            <CircleNotch className="animate-spin" color="white" size={20} weight="bold" />
          :
            children
      }
    </button>
  )
}
