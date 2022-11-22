import { useEffect, useState } from 'react'
import { CaretLeft } from 'phosphor-react'

import { api } from '../lib/axios'

import { Toast, ToastTypes } from './Toast'
import { Games, GameTypes } from './Games'
import { ParticipantTypes, ParticipantsList } from './ParticipantsList'

export type PoolDetailsTypes = {
  id: string;
  title: string;
  code: string;
  participants: ParticipantTypes[];
  _count: {
    participants: number;
  }
}

interface PoolDetailsProps {
  poolSelectedId: string;
  setPoolSelectedId: (value: string) => void;
}

export function PoolDetails({ poolSelectedId, setPoolSelectedId }: PoolDetailsProps) {
  const [poolDetails, setPoolDetails] = useState<PoolDetailsTypes>({} as PoolDetailsTypes)
  const [poolGames, setPoolGames] = useState<GameTypes[]>([])
  const [toastInfo, setToastInfo] = useState<ToastTypes>({} as ToastTypes)

  function handleCopyCode() {
    navigator.clipboard.writeText(poolDetails.code)

    setToastInfo({
      variant: 'SUCCESS',
      message: 'Código copiado com sucesso',
    })
  }

  useEffect(() => {
    async function fetchPoolDetails() {
      try {
        const { data } = await api.get(`/pools/${poolSelectedId}`)

        setPoolDetails(data.pool)
      } catch (error) {
        console.log(error)
        
        setToastInfo({
          variant: 'ERROR',
          message: 'Não foi possível carregar os detalhes do bolão',
        })

        setTimeout(() => setPoolSelectedId(''), 5000)        
      }
    }

    async function fetchGame() {
      try {
        const { data } = await api.get(`/pools/${poolSelectedId}/games`)
        
        setPoolGames(data.games)
      } catch (error) {
        console.log(error)

        setToastInfo({
          variant: 'ERROR',
          message: 'Não foi possível carregar os detalhes do bolão',
        })
      }
    }

    if (!!poolSelectedId.trim()) {
      fetchPoolDetails()
      fetchGame()
    }

  }, [poolSelectedId, setPoolSelectedId])

  if (poolDetails.title) {
    return (
      <div>
        <Toast
          info={toastInfo}
        />

        <div className="flex">
          <button
            className="text-gray-300 hover:text-gray-100 mr-4"
            onClick={() => setPoolSelectedId('')}
            title="Voltar"
          >
            <CaretLeft size={32} weight="bold" />
          </button>

          <div className="max-w-lg flex flex-1 justify-between items-center flex-wrap mx-auto rounded py-1">
            <div>
              <strong className="text-white text-2xl">{poolDetails.title}</strong>
              <p className="text-gray-200 text-sm">
                Código:{' '}
                <strong
                  className="cursor-copy hover:text-gray-100"
                  onClick={handleCopyCode}>
                  {poolDetails.code}
                </strong>
              </p>
            </div>

            <ParticipantsList
              participants={poolDetails.participants}
              count={poolDetails._count.participants}
            />
          </div>
        </div>

        <div className="w-full h-[2px] bg-gray-600 my-4" />
          {
            poolDetails._count.participants === 0
              ?
              <p className="mt-10 text-gray-200 text-center">
                Esse bolão ainda não tem participantes, que tal {' '}

                <span
                  title="Copiar código"
                  className="cursor-copy text-yellow-500 hover:underline"
                  onClick={handleCopyCode}                
                >
                  compartilhar o código
                </span>

                {' '} do bolão com alguém? Use o código {' '}

                <strong
                  title="Copiar código"
                  className="cursor-copy hover:text-gray-100"
                  onClick={handleCopyCode}
                >
                  {poolDetails.code}
                </strong>
              </p>

              :
                <Games games={poolGames} poolId={poolDetails.id} setPoolGames={setPoolGames} />
          }
      </div>
  )
  } else {
    return ( <Toast info={toastInfo} /> )
  }
}
