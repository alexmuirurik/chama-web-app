'use client'
import { useState } from 'react'
import CustomDialog from '../ui/customDialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddMemberSchema } from '@/prisma/schemas'
import { Input } from '../ui/input'
import { LoadingButton } from '../ui/loadingButton'
import { createMember } from '@/actions/memberController'
import { toast } from 'sonner'

const AddMember = ({ chamaId }: { chamaId: string }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof AddMemberSchema>>({
        resolver: zodResolver(AddMemberSchema),
        defaultValues: {
            chamaId: chamaId,
        },
    })
    const onSubmit = async (data: z.infer<typeof AddMemberSchema>) => {
        setLoading(true)
        try {
            const member = await createMember(data)
            if (member) {
                toast.success('Member added successfully')
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
            title="Add Member"
            variant="default"
        >
            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="grid md:grid-cols-2 gap-2">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="phoneNumber"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phnone Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                        <FormField
                            name="role"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="phoneNumber"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end">
                        <LoadingButton loading={loading} variant="default">
                            Add Member
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default AddMember
