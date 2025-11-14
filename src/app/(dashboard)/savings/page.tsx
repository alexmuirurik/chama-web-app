import AddFunds from "@/src/components/forms/addFunds"
import SearchForm from "@/src/components/forms/searchForm"
import PageTitle from "@/src/components/sections/pageTitle"

const SavingsPage = () => {
    return <div className="space-y-4">
        <PageTitle title="Savings">
            <div className="flex items-center gap-2">
                <SearchForm />
                <AddFunds />
            </div>
        </PageTitle>
    </div>
}

export default SavingsPage