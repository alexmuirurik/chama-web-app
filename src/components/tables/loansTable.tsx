'use client'
import { LoanWithMember } from "@/prisma/types/prismaBrowserTypes"

const LoansTable = ({ loans }: { loans: LoanWithMember[] }) => {
    return (
        <div className="border rounded-md">
            <div className="grid grid-cols-6 gap-2 text-sm py-3 px-4">
                <div>Member Name</div>
                <div>Loan Amount</div>
                <div>Loan Type</div>
                <div>Guarator 1</div>
                <div>Guarator 2</div>
                <div>Upload Document</div>
            </div>
            {loans.map((loan) => (
                <div
                    key={loan.id}
                    className="grid grid-cols-6 gap-2 border-t py-3 px-4 text-sm"
                >
                    <div>{loan.member.name}</div>
                    <div>{loan.loanAmount}</div>
                    <div>{loan.interest}</div>
                    <div>{loan.principle}</div>
                    <div>{loan.paymentDate?.toDateString()}</div>
                    <div>{loan.loanDocument}</div>
                </div>
            ))}
        </div>
    )
}

export default LoansTable
