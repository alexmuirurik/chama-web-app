'use client'
import z from 'zod'
import { useState } from 'react'
import CustomDialog from '../ui/customDialog'
import { LoanSchema } from '@/prisma/schemas/loanSchemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SelectLoanType from './selectLoanType'
import LoanForm from './loanForm'
import { MemberwithUser } from '@/prisma/types/prismaBrowserTypes'
import { Chama } from '@/src/generate/prisma/browser'

const MultiStepLoanForm = ({
    chama,
    members,
}: {
    chama: Chama
    members: MemberwithUser[]
}) => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(1)
    const form = useForm<z.infer<typeof LoanSchema>>({
        resolver: zodResolver(LoanSchema),
        defaultValues: {
            interest: chama.interestRate,
            termMonths: 1,
        },
    })

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title="Request Loan"
            variant="default"
        >
            <div className="flex">
                {step === 1 && (
                    <SelectLoanType
                        chamaId={chama.id}
                        setStep={setStep}
                        form={form}
                    />
                )}
                {step === 2 && (
                    <LoanForm
                        form={form}
                        members={members}
                        setStep={setStep}
                        chama={chama}
                    />
                )}
            </div>
        </CustomDialog>
    )
}

export default MultiStepLoanForm
