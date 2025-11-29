'use client'

import { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { LoadingButton } from '../ui/loadingButton'
import z from 'zod'
import { LoanSchema } from '@/prisma/schemas/loanSchemas'
import { MultiSelect } from '../ui/multi-select'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Chama, Member, Role } from '@/src/generate/prisma/browser'
import { toast } from 'sonner'
import { requestLoan } from '@/src/actions/loanController'
import { useRouter } from 'next/navigation'

const LoanForm = ({
    chama,
    members,
    form,
    setStep,
}: {
    chama: Chama
    members: Member[]
    form: UseFormReturn<z.infer<typeof LoanSchema>>
    setStep: Dispatch<SetStateAction<number>>
}) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const onTermChange = (value: string) => {
        form.setValue('termMonths', value as unknown as number)
        const termMonths = Number(value ?? 0)
        const loanAmount = form.getValues('loanAmount') ?? 0
        const monthlyRepayments = Math.round(loanAmount / termMonths)
        form.setValue('monthlyRepayment', monthlyRepayments)
    }

    const onLoanChange = (event: ChangeEvent<HTMLInputElement>) => {
        form.setValue('principle', event.target.value as unknown as number)
        const principle = Number(event.target.value ?? 0)
        const loanAmount = (principle * (100 + chama.interestRate)) / 100
        const termMonths = form.getValues('termMonths') ?? 1
        const monthlyRepayments = Math.round(loanAmount / termMonths)
        form.setValue('loanAmount', loanAmount)
        form.setValue('monthlyRepayment', monthlyRepayments)
    }

    const handleSubmit = async (data: z.infer<typeof LoanSchema>) => {
        setLoading(true)
        try {
            await requestLoan(data)
            toast.success('Loan requested successfully')
            setOpen(false)
            form.reset()
            router.refresh()
        } catch (error) {
            toast.error(`${error}`)
        }
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-7 w-full"
            >
                <FormField
                    name="memberId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Member Name</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger className="w-full" disabled>
                                        <SelectValue placeholder="Select Member" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {members.map((member) => (
                                        <SelectItem
                                            value={member.id}
                                            key={member.id}
                                        >
                                            {member.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        name="principle"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Principle Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter loan principle"
                                        onChange={onLoanChange}
                                        type="number"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="loanAmount"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Repayable</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter loan principle"
                                        disabled
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full">
                    <FormField
                        name="guarantors"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Guarators</FormLabel>
                                <FormControl>
                                    <MultiSelect
                                        hideSelectAll
                                        options={members
                                            .filter((member) => {
                                                return (
                                                    member.role !==
                                                        Role.ADMIN &&
                                                    member.id !==
                                                        form.getValues(
                                                            'memberId'
                                                        )
                                                )
                                            })
                                            .map((member) => ({
                                                label: member.name,
                                                value: member.id,
                                            }))}
                                        placeholder="Enter guarantor 1 name"
                                        onValueChange={(val) => {
                                            field.onChange(val)
                                        }}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid md:grid-cols-2 items-center gap-2">
                    <FormField
                        name="termMonths"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Loan Term</FormLabel>
                                <Select
                                    onValueChange={onTermChange}
                                    defaultValue="1"
                                    disabled={
                                        form.watch('loanType') === 'SHORT_TERM'
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full cursor-pointer">
                                            <SelectValue placeholder="Select loan term" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Array.from({ length: 12 }).map(
                                            (_, i) => (
                                                <SelectItem
                                                    key={i}
                                                    value={`${i + 1}`}
                                                >
                                                    {i + 1} Months
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="monthlyRepayment"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Monthly Repayments</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter loan principle"
                                        disabled
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    name="loanDocument"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Upload Document</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    placeholder="Upload document"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex justify-between items-center w-full ">
                    <LoadingButton
                        onClick={() => {
                            form.reset()
                            setStep(1)
                        }}
                    >
                        Back
                    </LoadingButton>
                    <LoadingButton loading={loading}>
                        Request Loan
                    </LoadingButton>
                </div>
            </form>
        </Form>
    )
}

export default LoanForm
