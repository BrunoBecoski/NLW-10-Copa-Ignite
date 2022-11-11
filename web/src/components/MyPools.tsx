import { useEffect, useState } from 'react'

import { api } from '../lib/axios'

import { Screens } from '../pages/pool'

import { PoolProps } from './PoolCard'
import { PoolsList } from './PoolsList';

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
      <PoolsList
        pools={pools}
        setScreen={setScreen}
      />
    </div>
  )
}
