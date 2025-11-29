'use client'

import { useForm, UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import CustomDialog from '../ui/customDialog'
import { Dispatch, SetStateAction, useState } from 'react'
import { LoadingButton } from '../ui/loadingButton'
import z, { set } from 'zod'
import { LoanSchema, LoanType } from '@/prisma/schemas/loanSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { MultiSelect } from '../ui/multi-select'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Member } from '@/src/generate/prisma/browser'
import { toast } from 'sonner'
import { requestLoan } from '@/src/actions/loanController'

const LoanForm = ({
    members,
    form,
    setStep,
}: {
    members: Member[]
    form: UseFormReturn<z.infer<typeof LoanSchema>>
    setStep: Dispatch<SetStateAction<number>>
}) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleSubmit = async (data: z.infer<typeof LoanSchema>) => {
        setLoading(true)
        try {
            await requestLoan(data)
            toast.success('Loan requested successfully')
            setOpen(false)
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
                        name="loanAmount"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loan Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter loan amount"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="loanType"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loan Type</FormLabel>
                                <Select
                                    {...field}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full cursor-pointer"
                                            disabled
                                        >
                                            <SelectValue placeholder="Select loan type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="LONG_TERM">
                                            Long Term
                                        </SelectItem>
                                        <SelectItem value="SHORT_TERM">
                                            Short Term
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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
                                        options={members.map((member) => ({
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
                <div className="flex w-full gap-2">
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
                    {form.watch('loanType') === 'LONG_TERM' && (
                        <FormField
                            name="termMonths"
                            control={form.control}
                            render={({ field: { onChange, value } }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Loan Term</FormLabel>
                                    <Select
                                        onValueChange={onChange}
                                        defaultValue="1"
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
                    )}
                </div>
                <div className="flex justify-between items-center w-full ">
                    <LoadingButton onClick={() => setStep(1)}>
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
