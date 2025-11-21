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
import { Member, TransactionStatus } from '@/src/generate/prisma/browser'

const AddFunds = ({
    members,
}: {
    members: Member[]
}) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedMember, setSelectedMember] = useState<string>()
    const form = useForm<z.infer<typeof CreateSavingSchema>>({
        resolver: zodResolver(CreateSavingSchema),
        defaultValues: {
            welfare: 100,
            status: TransactionStatus.COMPLETED,
        }
    })

    const updateSavings = (event: ChangeEvent<HTMLInputElement>) => {
        const amount = Number(event.target.value ?? 0)
        form.setValue("savings", amount - 100)
        form.setValue("amount", amount)
    }

    const selectMember = async (memberId: string) => {
        try {
            setSelectedMember(memberId)
            form.setValue('memberId', memberId)
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    const onSubmit = async (data: z.infer<typeof CreateSavingSchema>) => {
        setLoading(true)
        try {
            const member = await createSaving(data)
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
                                            <Input onChange={updateSavings} {...Input} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    name='savings'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Loan
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={0} disabled />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='welfare'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Ngumbato
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={0} disabled />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    name='savings'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Savings
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='welfare'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-neutral-600">
                                                Welfare
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={100} disabled />
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
