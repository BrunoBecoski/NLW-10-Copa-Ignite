import { Center, Icon, Text } from 'native-base'
import { Fontisto } from '@expo/vector-icons'

import { useAuth } from '../hooks/useAuth'

import { Button } from '../components/Button'

import Logo from '../assets/logo.svg'

export function SignIn() {
  const { signIn, user } = useAuth() 

  console.log('DADOS DO USUÁRIO => ', user);

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button
        mt={12}
        type="SECONDARY"
        title="ENTRAR COM GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        onPress={signIn}
      />

      <Text
        mt={4}
        color="gray.200"
        textAlign="center"
      >
        Não utilizamos nenhuma informação além  {'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}
