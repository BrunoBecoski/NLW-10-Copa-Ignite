import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Header } from '../components/Header'

export default function Pool() {
  const [screen, setScreen] = useState<'new' | 'my'>('new')

  const { data, status } = useSession()
  const { push } = useRouter()

  if(status === 'unauthenticated') {
    push('/')
  }
  
  if(status === 'authenticated') {
    return (
      <main>
        <Header
          user={data.user}
          screen={screen}
          setScreen={setScreen}
        />      
      </main>
    )
  }
}