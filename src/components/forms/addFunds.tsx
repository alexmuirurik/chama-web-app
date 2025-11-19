'use client'
import { FormEvent, useState } from 'react'
import CustomDialog from '../ui/customDialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { LoadingButton } from '../ui/loadingButton'
import z from 'zod'
import { toast } from 'sonner'
import { AddFundsSchema } from '@/prisma/schemas'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Member } from '@/src/generated/prisma/client'
import { addTransaction } from '@/src/actions/transactionController'
import { zodResolver } from '@hookform/resolvers/zod'
import { DeductionWithMember } from '@/prisma/prismaTypes'

const AddFunds = ({
    members,
    deductions,
}: {
    members: Member[]
    deductions: DeductionWithMember[]
}) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedMember, setSelectedMember] = useState<string>()
    const form = useForm<z.infer<typeof AddFundsSchema>>({
        resolver: zodResolver(AddFundsSchema),
    })

    const selectMember = async (memberId: string) => {
        try {
            setSelectedMember(memberId)
            form.setValue('memberId', memberId)
            const deduction = deductions.find(
                (deduction) => deduction.memberId === memberId
            )

            form.setValue('loanAmount', deduction?.longTermLoanRepayment ?? 0)
            form.setValue(
                'ngumbatoAmount',
                deduction?.shortTermLoanRepayment ?? 0
            )
            form.setValue('penaltiesAmount', deduction?.penaltiesRepayment ?? 0)
            form.setValue('interestAmount', deduction?.interest ?? 0)
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    const onSubmit = async (data: z.infer<typeof AddFundsSchema>) => {
        setLoading(true)
        try {
            const member = await addTransaction(data)
            if (member) {
                toast.success('Savings added successfully')
                setOpen(false)
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
                    {selectedMember && (
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
                                            <Input {...field} />
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
                                                <Input {...field} disabled />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="ngumbatoAmount"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Ngumbato
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    name="penaltiesAmount"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Penalties
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="interestAmount"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Interest
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
