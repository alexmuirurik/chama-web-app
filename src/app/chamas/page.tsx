import SearchForm from '@/src/components/forms/searchForm'
import PageTitle from '@/src/components/sections/pageTitle'
import ChamasTable from '@/src/components/tables/chamasTable'
import { Button } from '@/src/components/ui/button'

const ChamasPage = () => {
    const 
    return (
        <div className="space-y-4">
            <PageTitle title="Chamas">
                <div className="flex items-center gap-2">
                    <SearchForm />
                    <Button>
                        <span className="text-sm text-nowrap">
                            Create Chama
                        </span>
                    </Button>
                </div>
            </PageTitle>
            <div className="space-y-4">
                <ChamasTable  />
            </div>
        </div>
    )
}

export default ChamasPage
