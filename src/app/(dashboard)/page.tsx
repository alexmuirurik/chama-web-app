import { auth } from '@/auth'
import { getChamaById } from '@/src/actions/chamaController'
import { getMeetings } from '@/src/actions/meetingController'
import { getMembers } from '@/src/actions/memberController'
import { getSavings } from '@/src/actions/savingController'
import DashTitleCard from '@/src/components/cards/dashTitleCard'
import DashTransactions from '@/src/components/cards/dashTransactions'
import SavingsLoansChart from '@/src/components/charts/savingsLoansChart'
import { redirect } from 'next/navigation'
import { FaAdjust, FaBook, FaDollarSign, FaFolder } from 'react-icons/fa'

const DashboardPage = async () => {
    const session = await auth()
    const chama = await getChamaById(session?.user.chamaId as string)
    if (!chama) redirect('/chamas')
    const savings = await getSavings(chama.id)
    const members = await getMembers(chama.id)

    const totalSavings = savings.reduce((acc, saving) => {
        return acc + saving.amount
    }, 0)

    const totalLoans = savings.reduce((acc, saving) => {
        const loanAmount = saving.deduction?.loanAmount ?? 0
        return acc + loanAmount
    }, 0)

    const totalShortLoans = savings.reduce((acc, saving) => {
        const shortLoanAmount = saving.deduction?.shortLoanAmount ?? 0
        return acc + shortLoanAmount
    }, 0)

    const meeting = await getMeetings(chama.id)

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
                <DashTitleCard
                    icon={
                        <div className="bg-amber-700/50 rounded-lg p-2">
                            <FaFolder className="text-amber-700 rounded-lg h-6 w-6" />
                        </div>
                    }
                    title="Total Savings"
                    description={`${totalSavings.toFixed(2)} Ksh`}
                />
                <DashTitleCard
                    icon={
                        <div className="bg-amber-700/50 rounded-lg p-2">
                            <FaAdjust className="text-amber-700 rounded-lg h-6 w-6" />
                        </div>
                    }
                    title="Total Loans"
                    description={`${totalLoans.toFixed(2)} Ksh`}
                />
                <DashTitleCard
                    icon={
                        <div className="bg-amber-700/50 rounded-lg p-2">
                            <FaBook className="text-amber-700 rounded-lg h-6 w-6" />
                        </div>
                    }
                    title="Total Short Loans"
                    description={`${totalShortLoans.toFixed(2)} Ksh`}
                />
                <DashTitleCard
                    icon={
                        <div className="bg-amber-700/50 rounded-lg p-2">
                            <FaDollarSign className="text-amber-700 rounded-lg h-6 w-6" />
                        </div>
                    }
                    title="Next Meeting Date"
                    description="21 Dec 2023"
                />
            </div>
            <div className="flex gap-4">
                <div className="w-8/12">
                    <SavingsLoansChart />
                </div>
                <div className="w-4/12">
                    <DashTransactions savings={savings} />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
