import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ... rest }: InputProps) {
  return (
    <input 
      className="w-full py-3 px-6 bg-gray-800 text-gray-100 border border-gray-600 rounded placeholder:text-gray-300"
      {...rest}
    />
  )
}
