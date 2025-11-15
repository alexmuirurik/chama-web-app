import { DeductionWithMember } from "@/prisma/prismaTypes"

const SavingsTable = ({ deductions }: { deductions: DeductionWithMember[] }) => {
    return (
        <div className="border rounded-md">
            <div className="grid grid-cols-5 gap-2 text-sm py-3 px-4">
                <div>Member</div>
                <div>Loan Amount</div>
                <div>Ngumbato Amount</div>
                <div>Penalties Amount</div>
                <div>Interest Amount</div>
            </div>
            {deductions.map((deduction) => (
                <div
                    key={deduction.id}
                    className="grid grid-cols-5 gap-2 border-t py-3 px-4 text-sm"
                >
                    <div>{deduction.member.name}</div>
                    <div>{deduction.longTermLoanRepayment}</div>
                    <div>{deduction.shortTermLoanRepayment}</div>
                    <div>{deduction.penaltiesRepayment}</div>
                    <div>{deduction.interest}</div>
                </div>
            ))}
        </div>
    )
}

export default SavingsTable
