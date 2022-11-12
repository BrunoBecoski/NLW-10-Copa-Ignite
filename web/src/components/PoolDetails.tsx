import { CaretLeft } from 'phosphor-react'

import { Games, GameTypes } from './Games'
import { ParticipantTypes, ParticipantsList } from './ParticipantsList'

export type PoolDetailsTypes = {
  title: string;
  code: string;
  participants: ParticipantTypes[];
  _count: {
    participants: number;
  }
}

interface PoolDetailsProps {
  pool: PoolDetailsTypes;
  games: GameTypes[];
  setPoolSelectedId: (value: string) => void;
}

export function PoolDetails({ pool, games, setPoolSelectedId }: PoolDetailsProps) {
  if (pool.title) {
    return (
      <div className="w-[896px] mx-auto py-4">
        <div className="flex">
          <button
            className="text-gray-300 hover:text-gray-100"
            onClick={() => setPoolSelectedId('')}
            title="Voltar"
          >
            <CaretLeft size={32} weight="bold" />
          </button>

          <div className="max-w-lg flex flex-1 justify-between items-center mx-auto rounded py-1">
            <div>
              <strong className="text-white text-2xl">{pool.title}</strong>
              <p className="text-gray-200 text-sm">
                Código:{' '}
                <strong
                  className="cursor-copy hover:text-gray-100"
                  onClick={() => navigator.clipboard.writeText(pool.code)}>
                  {pool.code}
                </strong>
              </p>
            </div>

            <ParticipantsList
              participants={pool.participants}
              count={pool._count.participants}
            />
          </div>
        </div>

        <div className="w-full h-[2px] bg-gray-600 my-4" />
          {
            pool._count.participants === 0
              ?
              <p className="mt-10 text-gray-200 text-center">
                Esse bolão ainda não tem participantes, que tal {' '}

                <span
                  title="Copiar código"
                  className="cursor-copy text-yellow-500 hover:underline"
                  onClick={() => navigator.clipboard.writeText(pool.code)}                
                >
                  compartilhar o código
                </span>

                {' '} do bolão com alguém? Use o código {' '}

                <strong
                  title="Copiar código"
                  className="cursor-copy hover:text-gray-100"
                  onClick={() => navigator.clipboard.writeText(pool.code)}
                >
                  {pool.code}
                </strong>
              </p>

              :
                <Games games={games} />
          }
      </div>
  )
  } else {
    return ( <></> )
  }
}
