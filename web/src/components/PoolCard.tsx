import { Participant, ParticipantsList } from './ParticipantsList'

export interface PoolProps {
  id: string;
  title: string;
  owner: {
    name: string;
  }
  _count: {
    participants: number;
  }
  participants: Participant[]
}

interface PoolCardProps {
  pool: PoolProps;
}

export function PoolCard({ pool }: PoolCardProps) {
  return (
    <li 
      className="w-[440px] flex justify-between items-center p-5 rounded bg-gray-800 border-2 border-transparent border-b-yellow-500 hover:border-yellow-500"
    >
      <div>
        <strong className="text-white text-lg">{pool.title}</strong>
        <p className="text-gray-200 text-base">Criado por <span>{pool.owner.name}</span></p>
      </div>

      <div className="flex">
        { pool.participants.length === 0 
          ? 
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-gray-100 font-medium text-xs">
              0
            </div>
          :
            <ParticipantsList
              participants={pool.participants}
              count={pool._count.participants}
            />
          }
      </div>
    </li>
  )
}
