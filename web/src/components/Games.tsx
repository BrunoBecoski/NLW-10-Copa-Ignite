import { FormEvent, useState } from 'react'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { Check, CircleNotch, X } from 'phosphor-react'

import { api } from '../lib/axios'

export type GameTypes = {
  id: string;
  date: Date;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: {
    firstTeamPoints: number;
    secondTeamPoints: number 
  } | null;
}

export function getCountryInfo(countryCode: string) {
  switch (countryCode) {
    case 'DE':
      return {
        name: 'Alemanha',
        flag: '🇩🇪',
      };

    case 'SA':
      return {
        name: 'Arábia Saudita',
        flag: '🇸🇦',
      };

    case 'AR':
      return {
        name: 'Argentina',
        flag: '🇦🇷',
      };

    case 'AU':
      return {
        name: 'Austrália',
        flag: '🇦🇺',
      };

    case 'BE':
      return {
        name: 'Bélgica',
        flag: '🇧🇪',
      };

    case 'BR':
      return {
        name: 'Brasil',
        flag: '🇧🇷',
      };

    case 'CM':
      return {
        name: 'Camarões',
        flag: '🇨🇲',
      };

    case 'CA':
      return {
        name: 'Canadá',
        flag: '🇨🇦',
      };

    case 'QA':
      return {
        name: 'Catar',
        flag: '🇶🇦',
      };

    case 'KR':
      return {
        name: 'Coreia do Sul',
        flag: '🇰🇷',
      };

    case 'CR':
      return {
        name: 'Costa Rica',
        flag: '🇩🇴',
      };

    case 'HR':
      return {
        name: 'Croácia',
        flag: '🇭🇷',
      };

    case 'DK':
      return {
        name: 'Dinamarca',
        flag: '🇩🇰',
      };

    case 'EC':
      return {
        name: 'Equador',
        flag: '🇪🇨',
      };

    case 'ES':
      return {
        name: 'Espanha',
        flag: '🇪🇸',
      };

    case 'US':
      return {
        name: 'Estados Unidos',
        flag: '🇺🇸',
      };

    case 'FR':
      return {
        name: 'França',
        flag: '🇫🇷',
      };

    case 'GH':
      return {
        name: 'Gana',
        flag: '🇬🇭',
      };

    case 'GB-ENG':
      return {
        name: 'Inglaterra',
        flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      };

    case 'IR':
      return {
        name: 'Irã',
        flag: '🇮🇷',
      };

    case 'JP':
      return {
        name: 'Japão',
        flag: '🇯🇵',
      };

    case 'MA':
      return {
        name: 'Marrocos',
        flag: '🇲🇦',
      };

    case 'MX':
      return {
        name: 'México',
        flag: '🇲🇽',
      };

    case 'GB-WLS':
      return {
        name: 'País de Gales',
        flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
      };

    case 'NL':
      return {
        name: 'Países Baixos',
        flag: '🇳🇱',
      };

    case 'PL':
      return {
        name: 'Polônia',
        flag: '🇲🇹',
      };

    case 'PT':
      return {
        name: 'Portugal',
        flag: '🇵🇹',
      };

    case 'SN':
      return {
        name: 'Senegal',
        flag: '🇸🇳',
      };

    case 'RS':
      return {
        name: 'Sérvia',
        flag: '🇷🇸',
      };

    case 'CH':
      return {
        name: 'Suiça',
        flag: '🇨🇭',
      };

    case 'TN':
      return {
        name: 'Tunísia',
        flag: '🇹🇳',
      };

    case 'UY':
      return {
        name: 'Uruguai',
        flag: '🇺🇾',
      };

    default:
      return {
        name: '',
        flag: '',
      }
  }
}

interface GameProps {
  game: GameTypes;
  poolId: string;
}

function  Game({ game, poolId }: GameProps) {
  const [firstTeamPoints, setFirstTeamPoints] = useState(game.guess ? Number(game.guess.firstTeamPoints) : '')
  const [secondTeamPoints, setSecondTeamPoints] = useState(game.guess ? Number(game.guess.secondTeamPoints) : '')
  const [isLoading, setIsLoading] = useState(false)
  const [hasGuess, setHasGuess] = useState(!!game.guess)

  const isDatePassed = new Date(game.date) < new Date()
  const firstTeam = getCountryInfo(game.firstTeamCountryCode)
  const secondTeam = getCountryInfo(game.secondTeamCountryCode)
  const when = dayjs(game.date).locale(ptBR).format("DD [de] MMMM [de] YYYY [às] HH:00[h]")
  
  function handleGuess(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      api.post(`/pools/${poolId}/games/${game.id}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      })

      setHasGuess(true)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleGuess} 
      className="w-[440px] flex flex-col items-center justify-evenly p-4 rounded bg-gray-800 border-b-2 border-yellow-500"
    >
      <strong className="text-gray-100 text-lg text-center leading-relaxed ">{firstTeam.name} vs. {secondTeam.name}</strong>
      <span className="text-gray-200 mb-4 ">{when}</span>
      
      <div className="flex items-center justify-around w-full">
        <div className="flex items-center gap-4">
          <input
            placeholder="0"
            className="text-gray-100 placeholder:text-gray-300 bg-gray-900 border-2 border-gray-600  text-center rounded w-10 h-10"
            value={firstTeamPoints}
            onChange={event => setFirstTeamPoints(Number(event.target.value))}
            readOnly={hasGuess || isDatePassed}
            required
          />
          <span className="text-4xl">{firstTeam.flag}</span>
        </div>

        <X className="text-gray-300" weight="bold" size={32} />

        <div className="flex items-center gap-4">
          <span className="text-4xl">{secondTeam.flag}</span>
          <input
            placeholder="0"
            className="text-gray-100 placeholder:text-gray-300 bg-gray-900 border-2 border-gray-600  text-center rounded w-10 h-10"
            value={secondTeamPoints}
            onChange={event => setSecondTeamPoints(Number(event.target.value))}
            readOnly={hasGuess || isDatePassed}
            required
          />
        </div>
      </div>

        {
          isDatePassed
            ?
              <button
                className="cursor-not-allowed text-sm w-full  h-8 bg-gray-600 text-gray-300 leading-none uppercase font-bold rounded mt-6"
                disabled
              >         
                Tempo esgotado
              </button>
            :
              !hasGuess &&
                <button
                  className="text-sm w-full h-8 bg-green-500 text-white leading-none uppercase font-bold flex items-center justify-center gap-3 rounded mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {
                    isLoading
                      ?
                        <CircleNotch className="animate-spin" color="white" size={20} weight="bold" />
                      :
                        <>
                          Confimar palpite
                          <Check weight="bold" size={20} />
                        </>
                  }
                </button>
        }
    </form>
  )
}

interface GamesProps {
  games: GameTypes[];
  poolId: string;
  setPoolGames: (games: GameTypes[]) => void;
}

export function Games({ games, poolId }: GamesProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {games.map(game => <Game key={game.id} game={game} poolId={poolId} />)}
    </div>
  )
}
