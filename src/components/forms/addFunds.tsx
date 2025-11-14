'use client'
import { useState } from 'react'
import CustomDialog from '../ui/customDialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'

const AddFunds = () => {
    const [open, setOpen] = useState(false)
    const form = useForm()
    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title="Add Funds"
            variant="default"
        >
            <Form {...form}>
                <form className="space-y-4">
                    <FormField
                        name="amount"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </CustomDialog>
    )
}

export default AddFunds
