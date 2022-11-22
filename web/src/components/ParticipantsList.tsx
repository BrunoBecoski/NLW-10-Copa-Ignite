import Image from 'next/image'

export type ParticipantTypes = {
  id: string;
  user: {
    avatarUrl: string;
  }
}

interface ParticipantsListProps {
  participants: ParticipantTypes[];
  count: number;
}

export function ParticipantsList({ participants, count }: ParticipantsListProps) {
  return (
    <div className="flex">
      {
        participants.map((participant, index) => {
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
                className={`md:w-10 md:h-10 w-8 h-8 rounded-full border-2 border-gray-800
                  ${index < (count - 1) && 'mr-[-8px]'}
                `}
              />
            )
          }
        })
      }

      { participants.length > 4 &&
        <div className="md:w-10 md:h-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-100 font-medium text-sm ml-[-8px]">
          + {count - 4}
        </div>   
      }
    </div>
  )
}
