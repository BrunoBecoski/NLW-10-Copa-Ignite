import Image from 'next/image'

export type Participant = {
  id: string;
  user: {
    avatarUrl: string;
  }
}

interface ParticipantsListProps {
  participants: Participant[];
  count: number;
}

export function ParticipantsList({ participants, count }: ParticipantsListProps) {
  return (
    <>
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
                className={`w-10 h-10 rounded-full border-2 border-gray-700
                  ${index < (count - 1) && 'mr-[-8px]'}
                `}
              />
            )
          }
        })
      }

      { participants.length > 4 &&
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-gray-100 font-medium text-sm ml-[-8px]">
          + {count - 4}
        </div>   
      }
    </>
  )
}
