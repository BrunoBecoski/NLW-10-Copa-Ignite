import { FormEvent, useState } from 'react'

import { api } from '../lib/axios'

import { Input } from './Input'
import { Button } from './Button'

export function New() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  
  async function handleCreate(event: FormEvent) {
    setIsLoading(true)
    event.preventDefault()

    if(!title.trim()) {
      setIsLoading(false)
      return
    }

    try {
      await api.post('/pools', { title })
      setTitle('')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full max-w-lg mx-auto">
      <h2 className="text-white text-2xl font-bold my-10">
        Crie seu próprio bolão da copa e compartilhe entre amigos!
      </h2>

      <form onSubmit={handleCreate}>
        <Input
          placeholder="Qual nome do seu bolão"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      
        <Button
          onClick={handleCreate}
          type="submit"
          isLoading={isLoading}
        >
          Criar meu bolão
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-300 leading-relaxed">
        Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
      </p>
    </div>
  )
}
