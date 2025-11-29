import { auth } from '@/auth'
import { getChamaById, getChamas } from '@/src/actions/chamaController'
import { getMembers } from '@/src/actions/memberController'
import { getSavings } from '@/src/actions/savingController'
import AddFunds from '@/src/components/forms/addFunds'
import SearchForm from '@/src/components/forms/searchForm'
import PageTitle from '@/src/components/sections/pageTitle'
import SavingsTable from '@/src/components/tables/savingsTable'
import { redirect } from 'next/navigation'

const SavingsPage = async () => {
    const session = await auth()
    const chama = await getChamaById(session?.user.chamaId as string)
    if (!chama) redirect('/chamas')
    const members = await getMembers(session?.user?.chamaId as string)
    const savings = await getSavings(session?.user.chamaId as string)
    return (
        <div className="space-y-4">
            <PageTitle title="Savings">
                <div className="flex items-center gap-2">
                    <SearchForm />
                    <AddFunds chama={chama} members={members} />
                </div>
            </PageTitle>
            <div className="space-y-4">
                <SavingsTable savings={savings} />
            </div>
        </div>
    )
}

export default SavingsPage
