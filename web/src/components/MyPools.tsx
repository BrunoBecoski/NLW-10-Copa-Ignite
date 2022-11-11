import { useEffect, useState } from 'react'

import { api } from '../lib/axios'

import { Screens } from '../pages/pool'

import { PoolCard, PoolProps } from './PoolCard'

interface MyPoolsProps {
  setScreen: (value: Screens) => void;
}

export function MyPools({ setScreen }: MyPoolsProps) {
  const [pools, setPools] = useState<PoolProps[]>([])

  async function fetchPools() {
    try {
      const { data } = await api.get('/pools')

      setPools(data.pools)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPools()
  }, [])

  return (
    <div className="w-[896x] mx-auto py-8">
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
            <ul className="grid grid-cols-2 gap-4 mb-4">
              { pools.map(pool => <PoolCard key={pool.id} pool={pool} />) }
            </ul>
      }
    </div>
  )
}
