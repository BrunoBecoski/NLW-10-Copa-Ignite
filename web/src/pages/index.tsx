import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Check, GoogleLogo } from 'phosphor-react'

import { api } from '../lib/axios'

import { Button } from '../components/Button'

import logoImg from '../assets/logo.svg'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [isLoading, setIsLoading] = useState(false)

  function handleSignIn() {
    setIsLoading(true)
    signIn('google', { callbackUrl: '/pool' })
  }

  return (
    <div className="bg-app bg-no-repeat bg-cover">
      <main className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
        <div>
          <Image src={logoImg} alt="NLW Copa" />

          <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
            Crie seu próprio bolão da copa e compartihle entre amigos!
          </h1>

          <div className="mt-10 flex items-center gap-2">
            <Image src={usersAvatarExampleImg} alt="" />

            <strong className="text-gray-100 text-xl">
              <span className="text-green-400">+{props.userCount}</span> pessoas já estão usando
            </strong>
          </div>

          <Button onClick={handleSignIn} isLoading={isLoading} variant="SECONDARY">
            <GoogleLogo weight="bold" size={20} />
            Entrar con Google
          </Button>
  
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Não utilizamos nenhuma informação além do seu e-mail para criação de sua conta.
          </p>

          <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 flex justify-center items-center bg-green-400 rounded-full">
                <Check weight="bold" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+ {props.poolCount}</span>
                <span>Bolões criado</span>
              </div>
            </div>

            <div className="w-px h-14 bg-gray-600" />

            <div className="flex items-center gap-6">
              <div className="w-10 h-10 flex justify-center items-center bg-green-400 rounded-full">
                <Check weight="bold" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+ {props.guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </div>

        <Image
          src={appPreviewImg}
          alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
          quality={100}
          priority
        />
      </main>

    </div>
  )
}

export const getServerSideProps = async () => {
  const [
    poolCountResponse,
    guessCountResponse,
    userCountResponse
  ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}
