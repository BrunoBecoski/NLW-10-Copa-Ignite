import { ScreenTypes } from '../pages/pool'

import { PoolCard, PoolProps } from './PoolCard'

interface PoolsListProps {
  pools: PoolProps[];
  setScreen: (value: ScreenTypes) => void;
  setPoolSelectedId: (id: string) => void;
}

export function PoolsList({ pools, setScreen, setPoolSelectedId }: PoolsListProps) {
  return (
    <>
      {
        pools.length === 0 
          ?
            <p className="mt-4 text-gray-200 text-center">
              Você ainda não está participando de nenhum bolão, que tal {' '}
              <span 
                onClick={() => setScreen('findPool')}
                className="cursor-pointer text-yellow-500 hover:underline"
              >
                buscar um por código
              </span>

              {' '} ou {' '}

              <span 
                onClick={() => setScreen('newPool')}
                className="cursor-pointer text-yellow-500 hover:underline"
              >
                criar um novo
              </span>
              ?
            </p>

          :
            <ul className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
              { pools.map(pool => <PoolCard setPoolSelectedId={setPoolSelectedId} key={pool.id} pool={pool} />) }
            </ul>
      }
    </>
  )
}
