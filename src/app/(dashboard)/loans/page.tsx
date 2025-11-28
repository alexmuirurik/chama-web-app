import { auth } from "@/auth"
import { getLoans } from "@/src/actions/loanController"
import { getMembers } from "@/src/actions/memberController"
import LoanForm from "@/src/components/forms/loanForm"
import SearchForm from "@/src/components/forms/searchForm"
import PageTitle from "@/src/components/sections/pageTitle"
import LoansTable from "@/src/components/tables/loansTable"
import { redirect } from "next/navigation"

const LoansPage = async () => {
    const session = await auth()
    if (!session) redirect('/login')
    if (!session.user.chamaId) redirect('/chamas')
    const members = await getMembers(session.user.chamaId as string)
    const loans = await getLoans(session.user.chamaId as string)
    return (
        <div className="space-y-4">
            <PageTitle title="Chamas">
                <div className="flex items-center gap-2">
                    <SearchForm />
                    <LoanForm members={members} />
                </div>
            </PageTitle>
            <div className="space-y-4">
                <LoansTable loans={loans} />
            </div>
        </div>
    )
}

export default LoansPage
