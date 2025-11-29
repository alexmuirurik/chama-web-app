import { auth } from '@/auth'
import { getChamaById } from '@/src/actions/chamaController'
import { getLoans } from '@/src/actions/loanController'
import { getMembers } from '@/src/actions/memberController'
import MultiStepLoanForm from '@/src/components/forms/multiStepLoanForm'
import SearchForm from '@/src/components/forms/searchForm'
import PageTitle from '@/src/components/sections/pageTitle'
import LoansTable from '@/src/components/tables/loansTable'
import { redirect } from 'next/navigation'

const LoansPage = async () => {
    const session = await auth()
    const chama = await getChamaById(session?.user.chamaId as string)
    if (!chama) redirect('/chamas')
    const members = await getMembers(session?.user.chamaId as string)
    const loans = await getLoans(session?.user.chamaId as string)
    return (
        <div className="space-y-4">
            <PageTitle title="Loans">
                <div className="flex items-center gap-2">
                    <SearchForm />
                    <MultiStepLoanForm
                        chama={chama}
                        members={members}
                    />
                </div>
            </PageTitle>
            <div className="space-y-4">
                <LoansTable loans={loans} />
            </div>
        </div>
    )
}

export default LoansPage
