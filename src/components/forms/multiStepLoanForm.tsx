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

const MultiStepLoanForm = ({
    chamaId,
    members,
}: {
    chamaId: string
    members: MemberwithUser[]
}) => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(1)
    const form = useForm<z.infer<typeof LoanSchema>>({
        resolver: zodResolver(LoanSchema),
        defaultValues: {
            termMonths: 1,
        }
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
                        chamaId={chamaId}
                        setStep={setStep}
                        form={form}
                    />
                )}
                {step === 2 && <LoanForm form={form} members={members} setStep={setStep} />}
            </div>
        </CustomDialog>
    )
}

export default MultiStepLoanForm
