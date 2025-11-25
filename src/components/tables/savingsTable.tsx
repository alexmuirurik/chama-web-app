import { SavingWithMember } from "@/prisma/types/prismaTypes"

const SavingsTable = ({ savings }: { savings: SavingWithMember[] }) => {
    return (
        <div className="border rounded-md">
            <div className="grid grid-cols-5 gap-2 text-sm py-3 px-4">
                <div>Member</div>
                <div>Savings Amount</div>
                <div>Ngumbato Amount</div>
                <div>Penalties Amount</div>
                <div>Interest Amount</div>
            </div>
            {savings.map((saving) => (
                <div
                    key={saving.id}
                    className="grid grid-cols-5 gap-2 border-t py-3 px-4 text-sm"
                >
                    <div>{saving.member.name}</div>
                    <div>{saving.amount}</div>
                    <div>{saving.savings}</div>
                    <div>{saving.welfare}</div>
                    <div>{saving.status}</div>
                </div>
            ))}
        </div>
    )
}

export default SavingsTable
