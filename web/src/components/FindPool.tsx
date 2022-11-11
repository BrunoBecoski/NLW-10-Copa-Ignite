import { FormEvent, useState } from 'react'

import { api } from '../lib/axios'

import { Input } from './Input'
import { Button } from './Button'

export function FindPool() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await api.post('/pools/join', { code })
      setCode('')
    } catch (error) {
      console.log(error)      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full max-w-lg mx-auto">
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
