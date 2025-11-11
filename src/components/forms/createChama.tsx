'use client'

import { CreateChamaSchema } from '@/prisma/schemas'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import CustomDialog from '../ui/customDialog'
import { useState } from 'react'
import { LoadingButton } from '../ui/loadingButton'

const CreateChama = () => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof CreateChamaSchema>>({
        resolver: zodResolver(CreateChamaSchema),
    })

    const handleSubmit = async (data: z.infer<typeof CreateChamaSchema>) => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLoading(false)
    }

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title="Create Chama"
            variant="default"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full space-y-6"
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
                    <FormField
                        name="location"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="minimumSavings"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Minimum Savings</FormLabel>
                                <FormControl>
                                    <Input {...field} type='number' />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-end">
                        <LoadingButton loading={loading} variant="default">
                            <span className="text-sm text-nowrap">
                                Create Chama
                            </span>
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default CreateChama
