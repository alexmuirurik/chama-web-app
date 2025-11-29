import { auth } from "@/auth"
import { redirect } from "next/navigation"

const DividendsPage = async () => {
    const session = await auth()
    if (!session?.user.chamaId) redirect('/chamas')
    return <div>Dividends</div>
}   

export default DividendsPage