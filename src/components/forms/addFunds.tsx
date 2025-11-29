'use client'

import { ChangeEvent, useState } from 'react'
import CustomDialog from '../ui/customDialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { LoadingButton } from '../ui/loadingButton'
import z from 'zod'
import { toast } from 'sonner'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { createSaving } from '@/src/actions/savingController'
import { CreateSavingSchema } from '@/prisma/schemas/savingSchemas'
import { Chama, Member, TransactionStatus } from '@/src/generate/prisma/browser'
import { getMemberLoansandShortLoans } from '@/src/actions/memberController'
import { Memberloan } from '@/prisma/types/prismaBrowserTypes'
import { useRouter } from 'next/navigation'

const AddFunds = ({ chama, members }: { chama: Chama; members: Member[] }) => {
    const [memberLoans, setMemberLoans] = useState<Memberloan | null>(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof CreateSavingSchema>>({
        resolver: zodResolver(CreateSavingSchema),
        defaultValues: {
            savings: chama.minimumSavings,
            welfare: 100,
            status: TransactionStatus.COMPLETED,
            loanId: memberLoans?.loans[0]?.id ?? '',
            shortLoanId: memberLoans?.shortLoans[0]?.id ?? '',
            penaltyId: memberLoans?.penalties[0]?.id ?? '',
        },
    })

    const updateSavings = (event: ChangeEvent<HTMLInputElement>) => {
        form.setValue('amount', event.target.value as unknown as number)
        const amount = Number(event.target.value ?? 0)
        const loanAmount = form.getValues('loanAmount') ?? 0
        const shortLoanAmount = form.getValues('shortLoanAmount') ?? 0
        const penaltyAmount = form.getValues('penaltyAmount') ?? 0
        const welfare = form.getValues('welfare') ?? 0
        const savings =  amount - loanAmount - shortLoanAmount - penaltyAmount - welfare
        form.setValue('savings', savings)
    }

    const selectMember = async (memberId: string) => {
        setLoading(true)
        try {
            const memberLoans = await getMemberLoansandShortLoans(memberId)
            setMemberLoans(memberLoans)
            const loan = memberLoans?.loans[0]
            const shortLoan = memberLoans?.shortLoans[0]
            const penalty = memberLoans?.penalties[0]
            const loanAmount = loan?.monthlyRepayment ?? 0
            const shortLoanAmount = shortLoan?.loanAmount ?? 0
            const penaltyAmount = penalty?.penaltyAmount ?? 0
            const transactionAmount = form.getValues('amount') ?? 0
            const welfare = form.getValues('welfare') ?? 0
            const savings =  transactionAmount - loanAmount - shortLoanAmount - penaltyAmount - welfare
            form.setValue('penaltyAmount', penalty?.penaltyAmount ?? 0)
            form.setValue('loanAmount', loanAmount)
            form.setValue('shortLoanAmount', shortLoanAmount)
            form.setValue('loanId', loan ? loan.id : undefined)
            form.setValue('shortLoanId', shortLoan ? shortLoan.id : undefined)
            form.setValue('penaltyId', penalty ? penalty.id : undefined)
            form.setValue('savings', savings)
            form.setValue('memberId', memberId)
        } catch (error) {
            toast.error(`${error}`)
        }
        setLoading(false)
    }

    const onSubmit = async (data: z.infer<typeof CreateSavingSchema>) => {
        setLoading(true)
        try {
            const member = await createSaving(data)
            if (member) {
                toast.success('Savings added successfully')
                setOpen(false)
                form.reset()
                router.refresh()
            }
        } catch (error) {
            toast.error(`Error: ${error}`)
        } finally {
            setLoading(false)
        }
    }
    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title="Add Funds"
            variant="default"
        >
            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        name="memberId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-neutral-600">
                                    Member
                                </FormLabel>
                                <Select onValueChange={selectMember} {...field}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
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
                    {form.watch('memberId') && (
                        <div className="space-y-4">
                            <FormField
                                name="amount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-neutral-600">
                                            Amount
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                onChange={updateSavings}
                                                {...Input}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    name="loanAmount"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Loan
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    defaultValue={0}
                                                    disabled
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="shortLoanAmount"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Short Loan
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    defaultValue={0}
                                                    disabled
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    name="savings"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Savings
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="welfare"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Welfare
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    defaultValue={100}
                                                    disabled
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    name="penaltyAmount"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Penalty Amount
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    defaultValue={100}
                                                    disabled
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end items-center">
                        <LoadingButton loading={loading} variant="default">
                            Add Funds
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default AddFunds
