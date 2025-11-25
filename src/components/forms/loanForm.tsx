'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import CustomDialog from '../ui/customDialog'
import { useState } from 'react'
import { LoadingButton } from '../ui/loadingButton'

const LoanForm = () => {
    const [open, setOpen] = useState(false)
    const form = useForm()
    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title="Request Loan"
            variant="default"
        >
            <Form {...form}>
                <form className="space-y-7">
                    <FormField
                        name="loanAmount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Member Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Select member"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                            name="loanAmount"
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
                            name="loanAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loan Type</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Select loan type"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                            name="loanAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Guarator 1</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter guarantor 1"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="loanAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Guarator 2</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter guarantor 2"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        name="loanAmount"
                        render={({ field }) => (
                            <FormItem>
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
                    <div className="flex justify-end">
                        <LoadingButton loading={false} variant="default">
                            Request Loan
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default LoanForm
