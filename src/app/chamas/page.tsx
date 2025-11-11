import SearchForm from "@/src/components/forms/searchForm"
import PageTitle from "@/src/components/sections/pageTitle"
import { Button } from "@/src/components/ui/button"

const ChamasPage = () => {
    return (
        <PageTitle title="Chamas">
            <div className="flex items-center gap-2">
                <SearchForm />
                <Button >
                    <span className="text-sm text-nowrap">Create Chama</span>
                </Button>
            </div>
        </PageTitle>
    )
}

export default ChamasPage