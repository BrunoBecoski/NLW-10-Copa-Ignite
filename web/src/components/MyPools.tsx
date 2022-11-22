import { useEffect, useState } from 'react'

import { api } from '../lib/axios'

import { Toast, ToastTypes } from './Toast'
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
  const [toastInfo, setToastInfo] = useState<ToastTypes>({} as ToastTypes)

  useEffect(() => {
    async function fetchPools() {
      try {        
        const { data } = await api.get('/pools')

        setPools(data.pools)
      } catch (error) {
        console.log(error)

        setToastInfo({
          variant: 'ERROR',
          message: 'Não foi possível carregar os bolões',
        })
      }
    }

    fetchPools()
  }, [])  

  return (
    <div className="w-auto mx-auto py-8">
      <Toast 
        info={toastInfo}
      />

      {
        toastInfo.variant === 'ERROR'
          ? 
            <></> 
          :
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
