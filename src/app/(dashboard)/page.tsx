import { auth } from '@/auth'
import { getChamaById } from '@/src/actions/chamaController'
import DashTitleCard from '@/src/components/cards/dashTitleCard'
import { redirect } from 'next/navigation'
import { FaAdjust, FaBook, FaDollarSign, FaFolder } from 'react-icons/fa'

const DashboardPage = async () => {
    const session = await auth()
    const chama = await getChamaById(session?.user.chamaId as string)
    if (!chama) redirect('/chamas')
    return (
        <div className="relative">
            <div className="grid grid-cols-4 gap-4">
                <DashTitleCard
                    icon={
                        <div className="bg-amber-700/50 rounded-lg p-2">
                            <FaFolder className="text-amber-700 rounded-lg h-6 w-6" />
                        </div>
                    }
                    title="Total Savings"
                    description="Description"
                />
                <DashTitleCard
                    icon={
                        <div className="bg-amber-700/50 rounded-lg p-2">
                            <FaAdjust className="text-amber-700 rounded-lg h-6 w-6" />
                        </div>
                    }
                    title="Total Loans"
                    description="Description"
                />
                <DashTitleCard
                    icon={
                        <div className="bg-amber-700/50 rounded-lg p-2">
                            <FaBook className="text-amber-700 rounded-lg h-6 w-6" />
                        </div>
                    }
                    title="Total Short Loans"
                    description="Description"
                />
                <DashTitleCard
                    icon={
                        <div className="bg-amber-700/50 rounded-lg p-2">
                            <FaDollarSign className="text-amber-700 rounded-lg h-6 w-6" />
                        </div>
                    }
                    title="Next Meeting Date"
                    description="Description"
                />
            </div>
        </div>
    )
}

export default DashboardPage
