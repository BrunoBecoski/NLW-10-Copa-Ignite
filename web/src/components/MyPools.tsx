import { useEffect, useState } from 'react'

import { api } from '../lib/axios'

import { ScreenTypes } from '../pages/pool'
import { PoolProps } from './PoolCard'
import { PoolDetails } from './PoolDetails'
import { PoolsList } from './PoolsList'

interface MyPoolsProps {
  setScreen: (value: ScreenTypes) => void;
}

export function MyPools({ setScreen }: MyPoolsProps) {
  const [pools, setPools] = useState<PoolProps[]>([])
  const [poolSelectedId, setPoolSelectedId] = useState('')

  useEffect(() => {
    async function fetchPools() {
      try {
        const { data } = await api.get('/pools')

        setPools(data.pools)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPools()
  }, [])
  

  return (
    <div className="w-[896px] mx-auto py-8">
      {
        poolSelectedId 
          ?
            <PoolDetails
              poolSelectedId={poolSelectedId}
              setPoolSelectedId={setPoolSelectedId}
            />
          :
            <PoolsList
              pools={pools}
              setScreen={setScreen}
              setPoolSelectedId={setPoolSelectedId}
            />
    }
    </div>
  )
}
