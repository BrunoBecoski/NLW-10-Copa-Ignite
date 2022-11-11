import { useEffect, useState } from 'react'
import { MagnifyingGlass } from 'phosphor-react'

import { api } from '../lib/axios'

import { Button } from './Button'
import { PoolCard, PoolProps } from './PoolCard'

interface MyPoolsProps {
  setScreen: (value: 'new' | 'my') => void;
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
    <div className="w-[896x] mx-auto">
      <Button>
        <MagnifyingGlass weight="bold" size={20} />
        Buscar bolão por código
      </Button>

      <div className="my-4 w-full h-[1px] bg-gray-600" />

      {
        pools.length === 0 
          ?
            <p className="mt-4 text-gray-200 text-center">
              Você ainda não está participando de nenhum bolão, que tal {' '}
              <span className="cursor-pointer text-yellow-500 hover:underline">buscar um por código</span> 
              {' '} ou {' '}
              <span 
                onClick={() => setScreen('new')}
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
