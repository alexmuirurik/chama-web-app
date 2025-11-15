import { getMembers } from '@/src/actions/memberController'
import { auth } from '@/auth'
import MembersCard from '@/src/components/cards/memberCards'
import AddMember from '@/src/components/forms/addMember'
import SearchForm from '@/src/components/forms/searchForm'
import PageTitle from '@/src/components/sections/pageTitle'

const MembersPage = async () => {
    const session = await auth()
    const members = await getMembers(session?.user?.chamaId as string)
    return (
        session?.user && (
            <div className="space-y-4">
                <PageTitle title="Members">
                    <div className="flex items-center gap-2">
                        <SearchForm />
                        <AddMember chamaId={session.user.chamaId as string} />
                    </div>
                </PageTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 space-y-4 ">
                    <MembersCard members={members} />
                </div>
            </div>
        )
    )
}

export default MembersPage
