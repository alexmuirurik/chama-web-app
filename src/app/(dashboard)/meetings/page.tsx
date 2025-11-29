import { auth } from "@/auth"
import SearchForm from "@/src/components/forms/searchForm"
import PageTitle from "@/src/components/sections/pageTitle"
import CalendarTable from "@/src/components/cards/calendarTable"
import { redirect } from "next/navigation"
import NextMeetingDate from "@/src/components/cards/nextMeetingDate"

const MeetingsPage = async () => {
    const session = await auth()
    if (!session?.user.chamaId) redirect('/chamas')

    return (
        <div className="space-y-4">
            <PageTitle title="Meetings">
                <div className="flex items-center gap-2">
                    <SearchForm />
                    <NextMeetingDate />
                </div>
            </PageTitle>
            <div className="space-y-4">
                <CalendarTable />
            </div>
        </div>
    )
}

export default MeetingsPage