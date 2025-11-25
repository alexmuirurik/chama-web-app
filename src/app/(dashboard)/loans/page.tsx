import { auth } from "@/auth"
import { getLoans } from "@/src/actions/loanController"
import LoanForm from "@/src/components/forms/loanForm"
import SearchForm from "@/src/components/forms/searchForm"
import PageTitle from "@/src/components/sections/pageTitle"
import LoansTable from "@/src/components/tables/loansTable"
import TableTemplate from "@/src/components/tables/tableTemplate"
import { redirect } from "next/navigation"

const LoansPage = async () => {
    const session = await auth()
    if (!session) redirect('/login')
    const loans = await getLoans(session.user.chamaId as string)
    return (
        <div className="space-y-4">
            <PageTitle title="Chamas">
                <div className="flex items-center gap-2">
                    <SearchForm />
                    <LoanForm />
                </div>
            </PageTitle>
            <div className="space-y-4">
                <LoansTable loans={loans} />
            </div>
        </div>
    )
}

export default LoansPage
