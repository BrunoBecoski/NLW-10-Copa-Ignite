import { FormEvent, useState } from 'react'

import { api } from '../lib/axios'

import { Toast, ToastTypes } from './Toast'
import { Input } from './Input'
import { Button } from './Button'

export function FindPool() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toastInfo, setToastInfo] = useState<ToastTypes>({} as ToastTypes)

  async function handleSearch(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await api.post('/pools/join', { code })

      setToastInfo({
        variant: 'SUCCESS',
        message: 'Você entrou no bolão com sucesso',
      })
      
      setCode('')
    } catch (error: any) {
      console.log(error)
      
      if (error?.response?.data.message === 'Pool not found.') {
        setToastInfo({
          variant: 'ERROR',
          message: 'Bolão não encontrado',
        })

        return
      }

      if (error?.response?.data.message === 'You already joined this pool.') {
        setToastInfo({
          variant: 'ERROR',
          message: 'Você já está nesse bolão',
        })

        return
      }

      setToastInfo({
        variant: 'ERROR',
        message: 'Não foi possível entrar o bolão',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full max-w-lg mx-auto">
      <Toast
        info={toastInfo}
      />

      <h2 className="text-white text-2xl font-bold my-10">
        Encontre um bolão através de seu código único
      </h2>

      <form onSubmit={handleSearch}>
        <Input
          placeholder="Qual o código do bolão?"
          onChange={event => setCode(event.target.value)}
          value={code}
          required
        />
    
        <Button 
          type="submit"
          isLoading={isLoading}
        >
          Buscar bolão
        </Button>
      </form>
    </div>
  )
}
