import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps ) {
  return (
    <button
      className="w-full mt-4 px-6 py-4 flex items-center justify-center gap-3 font-bold text-sm uppercase rounded text-gray-100 bg-red-500 hover:bg-red-700"
      {...rest}
    >
      {children}
    </button>
  )
}
