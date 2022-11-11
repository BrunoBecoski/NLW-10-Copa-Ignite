import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { SignOut } from 'phosphor-react'

import { Screens } from '../pages/pool'

import logoImg from '../assets/logo.svg'

export type UserProps = {
  avatarUrl: string;
  name: string;
}

interface HeaderProps {
  user: UserProps;
  screen: Screens;
  setScreen: (value: Screens) => void;
}

export function Header({ user, screen, setScreen }: HeaderProps) {

  function handleSignOut() {
    signOut({
      callbackUrl: '/'
    })
  }

  return (
    <header className="bg-gray-800 text-white flex items-center justify-around">
      <Image src={logoImg} height={32} alt="NLW Copa" />

      <div className="flex justify-evenly gap-16">
        <button
          onClick={() => setScreen('newPool')}
          className={`flex items-center h-20 border-y-2 text-gray-300 border-transparent
            ${screen === 'newPool' 
              ? 'font-bold text-yellow-500 border-b-yellow-500' 
              : ' hover:text-gray-100'
            } 
          `}
        >
          Novo bolão
        </button>

        <button
          onClick={() => setScreen('myPools')}
          className={`flex items-center h-20 border-y-2 text-gray-300 border-transparent
            ${screen === 'myPools' 
                ? 'font-bold text-yellow-500 border-b-yellow-500' 
                : ' hover:text-gray-100'
              } 
          `}
        >
          Meus bolões
        </button>

        <button
          onClick={() => setScreen('findPool')}
          className={`flex items-center h-20 border-y-2 text-gray-300 border-transparent
            ${screen === 'findPool' 
                ? 'font-bold text-yellow-500 border-b-yellow-500' 
                : ' hover:text-gray-100'
              } 
          `}
        >
          Buscar por código
        </button>
      </div>

      <div className="flex items-center">
        <div className="bg-gray-800 rounded-full p-[2px] mr-2 border-2 border-white">
          <Image src={user.avatarUrl} alt={user.name} width={36} height={36}
            className="rounded-full"
          />
        </div>

        <span className="mr-10">{user.name}</span>
        
        <button onClick={handleSignOut} title="Sair" className="p-2 rounded bg-red-500 hover:bg-red-700" >
          <SignOut weight="bold" size={20} color="white" />
        </button>

      </div>
    </header>
  )
}