import Image from 'next/image'

export interface PoolProps {
  id: string;
  title: string;
  owner: {
    name: string;
  }
  _count: {
    participants: number;
  }
  participants: {
    id: string;
    user: {
      avatarUrl: string;
    }
  }[] | []
}

interface PoolCardProps {
  pool: PoolProps;
}

export function PoolCard({ pool }: PoolCardProps) {
  return (
    <li
      className="w-[440px] flex justify-between items-center p-5 rounded bg-gray-800 border-b-2 border-yellow-500"
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
            <>
              {
                pool.participants.map((participant, index) => {
                  if (index > 3) {
                    return
                  } else {
                    return (
                      <Image
                        width={40}
                        height={40}
                        key={participant.id}
                        src={participant.user.avatarUrl}
                        alt=""
                        className={`w-10 h-10 rounded-full border-2 border-gray-700
                          ${index < (pool._count.participants - 1) && 'ml-[-8px]'}
                        `}
                      />
                    )
                  }
                })
              }

              { pool.participants.length > 4 &&
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-gray-100 font-medium text-sm ml-[-8px]">
                  + {pool._count.participants - 4}
                </div>   
              }
            </>
          }
      </div>
    </li>
  )
}
