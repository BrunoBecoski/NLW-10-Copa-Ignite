import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Button } from '../components/Button'

export default function Pool() {
  const { status } = useSession()
  const { push } = useRouter()

  if(status === 'unauthenticated') {
    push('/')
  }
  
  function handleSignOut() {
    signOut({
      callbackUrl: '/'
    })
  }

  if(status === 'authenticated') {
    return (
      <main>
        <h1>Bolões</h1>
        <Button onClick={handleSignOut}>
            Sair
          </Button>
      </main>
    )
  }
}