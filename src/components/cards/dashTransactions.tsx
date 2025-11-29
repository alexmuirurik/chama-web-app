'use client'

import { SavingWithMember } from '@/prisma/types/prismaBrowserTypes'

const DashTransactions = ({ savings }: { savings: SavingWithMember[] }) => {
    return (
        <div className="border rounded-md">
            <div className="flex justify-between gap-2 text-sm py-3 px-4">
                <div>Name</div>
                <div>Savings</div>
            </div>
            {savings.map((saving) => (
                <div
                    key={saving.id}
                    className="flex justify-between gap-2 text-sm py-3 px-4 border-t"
                >
                    <div>{saving.member.name}</div>
                    <div className='text-teal-800'>{saving.deduction?.savings.toFixed(2)} Ksh</div>
                </div>
            ))}
        </div>
    )
}

export default DashTransactions
