import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { api } from '../lib/axios'

import { Header, UserTypes } from '../components/Header'
import { NewPool } from '../components/NewPool'
import { MyPools } from '../components/MyPools'
import { FindPool } from '../components/FindPool'

export type ScreenTypes = 'newPool' | 'myPools' | 'findPool'

export default function Pool() {
  const [screen, setScreen] = useState<ScreenTypes>('newPool')
  const [user, setUser] = useState<UserTypes>({} as UserTypes)
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
      <main className="flex flex-col">
        <Head>
          <title>
            {`<nlw/> Copa | 
              ${screen === 'newPool' ? 'Novo bolão' : '' }
              ${screen === 'myPools' ? 'Meus bolões' : '' }
              ${screen === 'findPool' ? 'Buscar por código' : '' }
            `}
          </title>
        </Head>

        <Header
          user={user}
          screen={screen}
          setScreen={setScreen}
        />

        <div className="lg:max-w-[1124px] md:max-w-[640px] w-full p-4 mx-auto">
          { screen === 'newPool' && <NewPool /> }
          { screen === 'myPools' && <MyPools setScreen={setScreen} /> }
          { screen === 'findPool' && <FindPool /> } 
        </div>
      </main>
    )
  }
}
