import { createContext, ReactNode } from 'react'

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  
  async function signIn() {
    console.log('Vanmos logar!')
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      user: {
        name: 'Bruno Becoski',
        avatarUrl: 'https://github.com/brunobecoski.png',
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}
