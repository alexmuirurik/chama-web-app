import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const DashboardPage = async () => {
    const session = await auth()
    if (!session?.user.chamaId) redirect('/chamas')
    return <div className="relative">Dashboard Page</div>
}

export default DashboardPage
