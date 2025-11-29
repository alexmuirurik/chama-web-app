'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { LoadingButton } from '../ui/loadingButton'
import { UseFormReturn } from 'react-hook-form'
import z from 'zod'
import { LoanSchema, LoanType } from '@/prisma/schemas/loanSchemas'
import { toast } from 'sonner'
import { getMembersWithoutActiveLoans } from '@/src/actions/memberController'
import { MemberwithUser } from '@/prisma/types/prismaBrowserTypes'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { FormControl } from '../ui/form'

const SelectLoanType = ({
    chamaId,
    setStep,
    form,
}: {
    chamaId: string
    setStep: Dispatch<SetStateAction<number>>
    form: UseFormReturn<z.infer<typeof LoanSchema>>
}) => {
    const [loading, setLoading] = useState(false)
    const [members, setMembers] = useState<MemberwithUser[]>([])

    const onClickNext = () => {
        if (!form.getValues('loanType')) {
            toast.error('Please select a loan type')
            return
        }

        if (members.length === 0) {
            getMembers()
            return
        }

        if (!form.getValues('memberId')) {
            toast.error('Please select a member')
            return
        }

        setStep(2)
    }

    const selectLoanType = (loanType: LoanType) => {
        setMembers([])
        form.setValue('memberId', '')
        form.setValue('loanType', loanType)
    }

    const getMembers = async () => {
        setLoading(true)
        try {
            const members = await getMembersWithoutActiveLoans(
                chamaId,
                form.getValues('loanType')
            )
            setMembers(members)
        } catch (error) {
            toast.error('Failed to fetch members')
        }
        setLoading(false)
    }

    const selectMember = (memberId: string) => {
        try {
            setLoading(true)
            form.setValue('memberId', memberId)
        } catch (error) {
            toast.error(`${error}`)
        }
        setLoading(false)
    }

    const active = form.watch('loanType')
    return (
        <div className="w-full space-y-4">
            <div>Select Loan Type</div>
            <div className="flex justify-between items-center gap-4 w-full p-4 ">
                <div
                    className={`border ${
                        active === 'LONG_TERM' ? 'border-purple-500' : ''
                    } rounded-lg px-24 py-10 cursor-pointer`}
                    onClick={() => selectLoanType('LONG_TERM')}
                >
                    Long Term
                </div>
                <div
                    className={`border ${
                        active === 'SHORT_TERM' ? 'border-purple-500' : ''
                    } rounded-lg px-24 py-10 cursor-pointer`}
                    onClick={() => selectLoanType('SHORT_TERM')}
                >
                    Short Term
                </div>
            </div>
            <div className="grid">
                {members.length > 0 && (
                    <Select onValueChange={selectMember}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Member" />
                        </SelectTrigger>
                        <SelectContent>
                            {members.map((member) => (
                                <SelectItem value={member.id} key={member.id}>
                                    {member.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>
            <div className="flex justify-end items-center">
                <LoadingButton
                    variant={members.length === 0 ? 'secondary' : 'default'}
                    loading={loading}
                    onClick={onClickNext}
                >
                    Next
                </LoadingButton>
            </div>
        </div>
    )
}

export default SelectLoanType
