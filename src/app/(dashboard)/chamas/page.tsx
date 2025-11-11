import { getChamas } from '@/actions/chamaController'
import CreateChama from '@/src/components/forms/createChama'
import SearchForm from '@/src/components/forms/searchForm'
import PageTitle from '@/src/components/sections/pageTitle'
import ChamasTable from '@/src/components/tables/chamasTable'
import { Button } from '@/src/components/ui/button'

const ChamasPage = async () => {
    const chamas = await getChamas()
    return (
        <div className="space-y-4">
            <PageTitle title="Chamas">
                <div className="flex items-center gap-2">
                    <SearchForm />
                    <CreateChama />
                </div>
            </PageTitle>
            <div className="space-y-4">
                <ChamasTable chamas={chamas} />
            </div>
        </div>
    )
}

export default ChamasPage
