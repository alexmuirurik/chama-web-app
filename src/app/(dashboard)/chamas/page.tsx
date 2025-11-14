import { getChamas } from '@/actions/chamaController'
import { auth } from '@/auth'
import CreateChama from '@/src/components/forms/createChama'
import SearchForm from '@/src/components/forms/searchForm'
import PageTitle from '@/src/components/sections/pageTitle'
import ChamasTable from '@/src/components/tables/chamasTable'

const ChamasPage = async () => {
    const session = await auth()
    const chamas = await getChamas()
    return session?.user && (
        <div className="space-y-4">
            <PageTitle title="Chamas">
                <div className="flex items-center gap-2">
                    <SearchForm />
                    <CreateChama userId={session?.user.id} />
                </div>
            </PageTitle>
            <div className="space-y-4">
                <ChamasTable chamas={chamas} />
            </div>
        </div>
    )
}

export default ChamasPage
