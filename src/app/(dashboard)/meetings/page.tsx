import { auth } from "@/auth"
import { redirect } from "next/navigation"

const MeetingsPage = async () => {
    const session = await auth()
    if (!session?.user.chamaId) redirect('/chamas')

    return <div>Meetings</div>
}

export default MeetingsPage