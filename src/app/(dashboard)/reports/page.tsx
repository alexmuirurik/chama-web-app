import { auth } from "@/auth"
import { redirect } from "next/navigation"

const ReportsPage = async () => {
    const session = await auth()
    if (!session?.user.chamaId) redirect('/chamas')

    return <div>Reports</div>
}

export default ReportsPage