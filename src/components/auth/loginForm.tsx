'use client'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Form, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/prisma/schemas/userschemas'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '../ui/input-otp'
import LoginButton from './loginButton'

const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
    })
    const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
        console.log(data)
    }
    return (
        <div className="space-y-6 ">
            <div className="grid md:grid-cols-2 border rounded-lg overflow-hidden">
                <div className="bg-neutral-200 relative hidden md:block border-e pointer-events-none">
                    <img
                        src="/images/logo.png"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
                <div className="bg-white p-4 ">
                    <Form {...form}>
                        <form className="p-6 md:p-8 space-y-4">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Welcome back
                                </h1>
                                <p className="text-muted-foreground text-balance space-x-1">
                                    <span>Login to your</span>
                                    <span className="font-bold pointer-events-none">
                                        Olive Jikuze Account
                                    </span>
                                </p>
                            </div>
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel htmlFor="password">
                                                OTP Code
                                            </FormLabel>
                                            <Button
                                                className="text-xs text-neutral-400 cursor-pointer"
                                                variant="ghost"
                                            >
                                                Request OTP
                                            </Button>
                                        </div>
                                        <div className="flex w-full">
                                            <InputOTP
                                                className="w-full"
                                                maxLength={6}
                                            >
                                                <InputOTPGroup className="flex grow w-full">
                                                    <InputOTPSlot
                                                        className="flex grow"
                                                        index={0}
                                                    />
                                                    <InputOTPSlot
                                                        className="flex grow"
                                                        index={1}
                                                    />
                                                    <InputOTPSlot
                                                        className="flex grow"
                                                        index={2}
                                                    />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup className="flex grow w-full">
                                                    <InputOTPSlot
                                                        className="flex grow"
                                                        index={3}
                                                    />
                                                    <InputOTPSlot
                                                        className="flex grow"
                                                        index={4}
                                                    />
                                                    <InputOTPSlot
                                                        className="flex grow"
                                                        index={5}
                                                    />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div>
                                <Button
                                    className="w-full cursor-pointer"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                        <div className="space-y-4 p-6 md:p-8">
                            <div className="*:data-[slot=field-separator-content]:bg-card text-center">
                                Or continue with
                            </div>
                            <LoginButton />
                        </div>
                    </Form>
                </div>
            </div>
            <div className="px-6 text-center">
                By clicking continue, you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default LoginForm
