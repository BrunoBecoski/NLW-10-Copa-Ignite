import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Check, GoogleLogo } from 'phosphor-react'

import { api } from '../lib/axios'

import { Toast, ToastTypes } from '../components/Toast'
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
  const [toastInfo, setToastInfo] = useState<ToastTypes>({} as ToastTypes)

  function handleSignIn() {
    setIsLoading(true)

    try {      
      signIn('google', { callbackUrl: '/pool' })

      setToastInfo({
        variant: 'SUCCESS',
        message: 'Login feito com sucesso',
      })
    } catch (error) {
      setIsLoading(false)
      
      setToastInfo({
        variant: 'ERROR',
        message: 'Não foi possível fazer login',
      })
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Head>
        <title>{'<nlw/> Copa'}</title>
      </Head>

      <Toast
        info={toastInfo}
      />

      <main className="lg:max-w-[1124px] max-w-[640px] min-h-[100vh] grid lg:grid-cols-2 grid-cols-1 gap-28 items-center lg:p-10">
        <div>
          <Image src={logoImg} alt="NLW Copa" className="lg:mx-0 mx-auto" />

          <h1 className="mt-14 text-white sm:text-5xl text-4xl font-bold leading-tight lg:text-left text-center">
            Crie seu próprio bolão da copa e compartihle entre amigos!
          </h1>

          <div className="mt-10 flex items-center gap-2">
            <Image src={usersAvatarExampleImg}  width={150} height={48} alt="" className="flex-1 max-w-[150px] max-h-[48px]" />

            <strong className="text-gray-100 sm:text-xl text-base ">
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

          <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between sm:flex-row flex-col gap-4 text-gray-100">
            <div className="flex items-center gap-6 sm:w-auto w-full justify-center">
              <div className="w-10 h-10 flex justify-center items-center bg-green-400 rounded-full">
                <Check weight="bold" size={24} color="white" />
              </div>
              <div className="flex sm:flex-col flex-row sm:items-start items-center sm:gap-0 gap-2">
                <span className="font-bold text-2xl">+ {props.poolCount}</span>
                <span>Bolões criado</span>
              </div>
            </div>

            <div className="w-px h-14 bg-gray-600 sm:block hidden" />

            <div className="flex items-center gap-6 sm:w-auto w-full justify-center">
              <div className="w-10 h-10 flex justify-center items-center bg-green-400 rounded-full">
                <Check weight="bold" size={24} color="white" />
              </div>
              <div className="flex sm:flex-col flex-row sm:items-start items-center sm:gap-0 gap-2">
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
          className="hidden lg:block"
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
