import { Role } from '@/src/generate/prisma/enums'
import z from 'zod'

export const UpdateUserSchema = z.object({
    userId: z.string(),
    name: z.string().optional(),
    email: z.email().optional(),
    image: z.string().optional(),
    chamaId: z.string().optional(),
    role: z.string<Role>(),
})

export const CreateChamaSchema = z.object({
    userId: z.string(),
    name: z.string(),
    location: z.string(),
    minimumSavings: z
        .transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
    interestRate: z
        .transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
})

export const AddMemberSchema = z.object({
    name: z.string(),
    email: z.email(),
    phoneNumber: z.string(),
    role: z.string<Role>(),
    chamaId: z.string(),
})

export const CreateMemberSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    role: z.string<Role>(),
    chamaId: z.string(),
    userId: z.string().optional(),
})

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const AddFundsSchema = z.object({
    amount: z
        .transform(Number)
        .pipe(z.number().min(10, 'Please enter your price.')),
    memberId: z.string(),
    loanAmount: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
    ngumbatoAmount: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
    penaltiesAmount: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
    interestAmount: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
})
