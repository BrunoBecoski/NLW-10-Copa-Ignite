import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { List, SignOut, X } from 'phosphor-react'

import { ScreenTypes } from '../pages/pool'

import logoImg from '../assets/logo.svg'

export type UserTypes = {
  avatarUrl: string;
  name: string;
}

interface HeaderProps {
  user: UserTypes;
  screen: ScreenTypes;
  setScreen: (value: ScreenTypes) => void;
}

export function Header({ user, screen, setScreen }: HeaderProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  function handleSignOut() {
    signOut({
      callbackUrl: '/'
    })
  }

  function handleOpenMenu() {
    console.log('abrir')
    setMenuIsOpen(!menuIsOpen)
  }

  function handleNavigate(screen: ScreenTypes) {
    setScreen(screen)
    setMenuIsOpen(false)
  }

  return (
    <>
      <header className="bg-gray-800 text-white flex items-center justify-between sm:justify-around py-4 sm:py-0 px-4">
        <div className="w-5" />

        <Image src={logoImg} height={32} alt="NLW Copa" className="h-6 sm:h-8" />

        <div className="justify-evenly gap-16 hidden md:flex">
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

        <div className="items-center
          hidden md:flex
        ">
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

        <button onClick={handleOpenMenu} className="block sm:hidden">
          {
            menuIsOpen
              ?
                <X weight="bold" size={24} />
              :
                <List weight="bold" size={24} />
        }
        </button>
      </header>

      {
        menuIsOpen &&
          <div className="bg-gray-800 fixed mt-14 top-0 right-0 bottom-0 left-0 flex flex-col justify-evenly items-center">

            <div className="flex items-center gap-4">
              <span className="text-white text-lg font-medium">{user.name}</span>

              <div className="bg-gray-800 rounded-full p-[2px] mr-2 border-2 border-white">
                <Image src={user.avatarUrl} alt={user.name} width={36} height={36} className="rounded-full" />
              </div>
            </div>

            <button 
              onClick={() => handleNavigate('newPool')}
              className={`text-white flex items-center justify-around gap-4 text-2xl font-medium
                ${screen === 'newPool' && 'text-yellow-500' }
              `}
            >
              Novo bolão
            </button>

            <button 
              onClick={() => handleNavigate('myPools')}
              className={`text-white flex items-center justify-around gap-4 text-2xl font-medium
                ${screen === 'myPools' && 'text-yellow-500' }
              `}
            >
              Meus bolões
            </button>

            <button 
              onClick={() => handleNavigate('findPool')}
              className={`text-white flex items-center justify-around gap-4 text-2xl font-medium
                ${screen === 'findPool' && 'text-yellow-500' }
              `}
            >
              Buscar por código
            </button>
          
            <button onClick={handleSignOut} title="Sair" className="p-2 rounded bg-red-500 hover:bg-red-700 text-white flex items-center justify-center gap-8 text-2xl font-medium w-64">
              Sair
              <SignOut weight="bold" />
            </button>
          </div>
      }
    </>
  )
}
