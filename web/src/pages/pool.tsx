import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { api } from '../lib/axios'

import { Header, UserProps } from '../components/Header'
import { New } from '../components/New'


export default function Pool() {
  const [screen, setScreen] = useState<'new' | 'my'>('new')
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isLoading, setIsLoading] = useState(true);

  const { data, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      signInWithGoogle(data.access_token)
    } 
    
    if (status === 'unauthenticated') {
      push('/')
    }
  }, [status, data, push])

  async function signInWithGoogle(access_token: string) {
    try {
      const tokenResponse = await api.post('/users', { access_token })
  
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`
  
      const { data } = await api.get('/me')
    
      setUser({
        avatarUrl: data.user.avatarUrl,
        name: data.user.name,
      })

    } catch (error) {
      console.log(error)
      push('/')
    } finally {
      setIsLoading(false);
    }
  }
  
  if (!isLoading) {
    return (
      <main className="w-screen h-screen flex flex-col">
        <Header
          user={user}
          screen={screen}
          setScreen={setScreen}
        />
        
        { screen === 'new' && <New /> }
      </main>
    )
  }
}
