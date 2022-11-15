import { FormEvent, useState } from 'react'
import { Copy, X } from 'phosphor-react'

import { api } from '../lib/axios'

import { Toast, ToastTypes } from './Toast'
import { Input } from './Input'
import { Button } from './Button'

export function NewPool() {
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [toastInfo, setToastInfo] = useState<ToastTypes>({} as ToastTypes)

  async function handleCreate(event: FormEvent) {
    event.preventDefault()

    try {
      const { data } = await api.post('/pools', { title })
      
      setCode(data.code)
      setModalIsOpen(true)
      setIsLoading(false)

      setToastInfo({
        variant: 'SUCCESS',
        message: 'Bolão criado com sucesso'
      })
    } catch (error) {
      console.log(error)

      setToastInfo({
        variant: 'ERROR',
        message: 'Não foi possível criar o bolão',
      })
    }
  }

  function handleCloseModal() {
    setTitle('')
    setModalIsOpen(false)
  }

  function handleCopyCode() {
    navigator.clipboard.writeText(code)

    setToastInfo({
      variant: 'SUCCESS',
      message: 'Código copiado com sucesso',
    })
  }

  return (
    <div className="h-full max-w-lg mx-auto">
      <Toast 
        info={toastInfo}
      />

      <h2 className="text-white text-2xl font-bold my-10">
        Crie seu próprio bolão da copa e compartilhe entre amigos!
      </h2>

      <form onSubmit={handleCreate}>
        <Input
          placeholder="Qual nome do seu bolão"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <Button
          type="submit"
          isLoading={isLoading}
        >
          Criar meu bolão
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-300 leading-relaxed">
        Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
      </p>

      {
        modalIsOpen &&
          <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-950/75">
            <div className="flex flex-col items-center p-12 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg bg-gray-800">
              <h3 className="text-white text-2xl font-bold">Bolão criado com sucesso!</h3>

              <button
                className="absolute right-4 top-4 text-gray-300 hover:text-gray-100"
                title="Fechar"
                onClick={handleCloseModal}
              >
                <X size={24} weight="bold" />
              </button>

              <p className="py-5 text-xl text-center text-gray-100">{title}</p>

              <p className="pb-3 text-md text-center text-gray-300">código</p>

              <div className="flex justify-between gap-6 mx-auto py-3 px-6 rounded-md bg-gray-600">
                <span className="text-2xl text-gray-100">{code}</span>

                <button
                  onClick={handleCopyCode}
                  title="Copiar código"
                  className="cursor-copy text-gray-300 hover:text-gray-100"
                >
                  <Copy size={30} />
                </button>
              </div>
            </div>
          </div>
      }
    </div>
  )
}
