import { Avatar, AvatarImage } from '../ui/avatar'
import { MemberwithUser } from '@/prisma/prismaTypes'

const MembersCard = ({ members }: { members: MemberwithUser[] }) => {
    return members.map((member) => (
        <div className="flex flex-col gap-2 p-4 border rounded-md">
            <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 rounded-full bg-neutral-200">
                    <AvatarImage src={member.user?.image ?? ''} />
                </Avatar>
                <div className="text-sm font-medium">{member.name}</div>
            </div>
            <div className="text-sm text-muted-foreground">{member.email}</div>
        </div>
    ))
}

export default MembersCard
