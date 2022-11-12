import { useEffect, useState } from 'react'

import { api } from '../lib/axios'

import { ScreenTypes } from '../pages/pool'
import { GameTypes } from './Games'

import { PoolProps } from './PoolCard'
import { PoolDetails, PoolDetailsTypes } from './PoolDetails';
import { PoolsList } from './PoolsList';

interface MyPoolsProps {
  setScreen: (value: ScreenTypes) => void;
}

export function MyPools({ setScreen }: MyPoolsProps) {
  const [pools, setPools] = useState<PoolProps[]>([])
  const [poolSelectedId, setPoolSelectedId] = useState('')
  const [poolSelectedDetails, setPoolSelectedDetails] = useState<PoolDetailsTypes>({} as PoolDetailsTypes)
  const [poolSelectedGames, setPoolSelectedGames] = useState<GameTypes[]>([]);

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
  
  useEffect(() => {
    async function fetchPoolDetails() {
      try {
        const { data } = await api.get(`/pools/${poolSelectedId}`)
        setPoolSelectedDetails(data.pool)
      } catch (error) {
        console.log(error)
      }
    }

    async function fetchGame() {
      try {
        const { data } = await api.get(`/pools/${poolSelectedId}/games`)

        setPoolSelectedGames(data.games)
      } catch (error) {
        console.log(error)
      }
    }


    if (!!poolSelectedId.trim()) {
      fetchPoolDetails()
      fetchGame()
    }

  }, [poolSelectedId])

  return (
    <div className="w-[896px] mx-auto py-8">
      {
        poolSelectedId 
          ?
            <PoolDetails
              setPoolSelectedId={setPoolSelectedId}
              pool={poolSelectedDetails}
              games={poolSelectedGames}
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
