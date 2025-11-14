'use client'
import { useState } from 'react'
import CustomDialog from '../ui/customDialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddMemberSchema } from '@/prisma/schemas'
import { Input } from '../ui/input'

const AddMember = () => {
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof AddMemberSchema>>({
        resolver: zodResolver(AddMemberSchema),
    })
    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title="Add Member"
            variant="default"
        >
            <Form {...form}>
                <form>
                    <FormField name='name' control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    ) }/>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default AddMember
