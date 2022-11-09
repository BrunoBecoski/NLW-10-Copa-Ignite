import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { SignOut } from 'phosphor-react'

import logoImg from '../assets/logo.svg'

interface HeaderProps {
  user: {
    image: string;
    name: string;
  }
  screen: 'new' | 'my';
  setScreen: (value: 'new' | 'my') => void;
}

export function Header({ user, screen, setScreen }: HeaderProps) {

  function handleSignOut() {
    signOut({
      callbackUrl: '/'
    })
  }

  return (
    <header className="bg-gray-800 text-white flex items-center justify-around">
      <Image src={logoImg} alt="NLW Copa" className="h-8" />

      <div className="flex justify-evenly gap-16">
        <button
          onClick={() => setScreen('new')}
          className={`flex items-center h-20 border-y-2 text-gray-300 border-transparent
            ${screen === 'new' 
              ? 'font-bold text-yellow-500 border-b-yellow-500' 
              : ' hover:text-gray-100'
            } 
          `}
        >
          Novo bolão
        </button>

        <button
          onClick={() => setScreen('my')}
          className={`flex items-center h-20 border-y-2 text-gray-300 border-transparent
            ${screen === 'my' 
                ? 'font-bold text-yellow-500 border-b-yellow-500' 
                : ' hover:text-gray-100'
              } 
          `}
        >
          Meus bolões
        </button>
      </div>

      <div className="flex items-center">
        <div className="bg-gray-800 rounded-full p-[2px] mr-2 border-2 border-white">
          <Image src={user.image} alt={user.name} width={36} height={36}
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