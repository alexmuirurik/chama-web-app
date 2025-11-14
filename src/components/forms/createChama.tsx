'use client'

import { CreateChamaSchema } from '@/prisma/schemas'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import CustomDialog from '../ui/customDialog'
import { useState } from 'react'
import { toast } from 'sonner'
import { LoadingButton } from '../ui/loadingButton'
import { createChama } from '@/actions/chamaController'
import { useRouter } from 'next/navigation'

const CreateChama = ({ userId }: { userId: string }) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof CreateChamaSchema>>({
        resolver: zodResolver(CreateChamaSchema),
        defaultValues: {
            userId: userId,
        },
    })

    const handleSubmit = async (data: z.infer<typeof CreateChamaSchema>) => {
        setLoading(true)
        try {
            alert(data.userId)
            const chama = await createChama(data)
            if (chama) {
                router.refresh()
                setOpen(false)
                toast.success('Chama created successfully')
                form.reset()
            }
        } catch (error: any) {
            toast.error(`${error}`)
        }
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
                                    <Input type="number" {...field} />
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
