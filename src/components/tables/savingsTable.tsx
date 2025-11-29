import { SavingWithMember } from "@/prisma/types/prismaTypes"

const SavingsTable = ({ savings }: { savings: SavingWithMember[] }) => {
    return (
        <div className="border rounded-md">
            <div className="grid grid-cols-7 gap-2 text-sm py-3 px-4">
                <div>Member</div>
                <div>Savings Amount</div>
                <div>Loan Amount</div>
                <div>Short Loan Amount</div>
                <div>Penalties Amount</div>
                <div>Welfare Funds</div>
                <div>Total Amount</div>
            </div>
            {savings.map((saving) => (
                <div
                    key={saving.id}
                    className="grid grid-cols-7 gap-2 border-t py-3 px-4 text-sm"
                >
                    <div>{saving.member.name}</div>
                    <div>{saving.deduction?.savings}</div>
                    <div>{saving.deduction?.loanAmount}</div>
                    <div>{saving.deduction?.shortLoanAmount}</div>
                    <div>{saving.deduction?.penaltyAmount}</div>
                    <div>{saving.deduction?.welfare}</div>
                    <div>{saving.amount}</div>
                </div>
            ))}
        </div>
    )
}

export default SavingsTable
