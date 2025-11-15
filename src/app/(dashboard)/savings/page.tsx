import { auth } from '@/auth'
import { getDeductions } from '@/src/actions/deductionController'
import { getMembers } from '@/src/actions/memberController'
import AddFunds from '@/src/components/forms/addFunds'
import SearchForm from '@/src/components/forms/searchForm'
import PageTitle from '@/src/components/sections/pageTitle'
import SavingsTable from '@/src/components/tables/savingsTable'
import { redirect } from 'next/navigation'

const SavingsPage = async () => {
    const session = await auth()
    if (!session?.user) redirect('/login')
    const members = await getMembers(session?.user?.chamaId as string)
    const deductions = await getDeductions(session?.user?.chamaId as string)
    return (
        <div className="space-y-4">
            <PageTitle title="Savings">
                <div className="flex items-center gap-2">
                    <SearchForm />
                    <AddFunds members={members} deductions={deductions} />
                </div>
            </PageTitle>
            <div className="space-y-4">
                <SavingsTable deductions={deductions} />
            </div>
        </div>
    )
}

export default SavingsPage
