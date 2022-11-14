import { useEffect, useState } from 'react'
import { CheckCircle, Warning } from 'phosphor-react'

export interface ToastTypes {
  message: string;
  variant: 'SUCCESS' | 'ERROR';
}

interface ToastProps {
  info: ToastTypes;
}

export function Toast({ info }: ToastProps) {
  const [showToast, setShowToast] = useState(false)

  const { variant, message } = info

  useEffect(() => {
    setShowToast(true)

    setTimeout(() => setShowToast(false), 5000)
  }, [info])

  if(showToast) {
    switch (variant) {
      case 'SUCCESS' :
        return <ToastSuccess message={message} /> 
            
      case 'ERROR':
        return <ToastError message={message} />
      
      default:
        return <></>
    }
  } else {
    return <></>
  }
}

interface ToastVariantProps {
  message: string;
}

function ToastSuccess({ message }: ToastVariantProps) {
  return (
    <div className="fixed w-full flex justify-center">
      <div className="flex items-center gap-4 px-8 py-4 bg-green-500 text-white text-lg rounded-lg animate-toast">
        <CheckCircle size={24} weight="bold"/>
        <strong className="font-medium">{message}</strong>
      </div> 
    </div>
  )
}

function ToastError({ message }: ToastVariantProps) {
  return (
    <div className="fixed w-full flex justify-center">
      <div className="flex items-center gap-4 px-8 py-4 bg-red-500 text-white text-lg rounded-lg animate-toast">
        <Warning size={24} weight="bold" />
        <strong className=" font-medium">{message}</strong>
      </div> 
    </div>
  )
}
