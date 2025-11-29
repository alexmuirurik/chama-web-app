import { TransactionStatus } from '@/src/generate/prisma/enums'
import z from 'zod'

export const CreateSavingSchema = z.object({
    memberId: z.string(),
    amount: z
        .transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
    savings: z
        .transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
    welfare: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
    loanAmount: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
    shortLoanAmount: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
    penaltyAmount: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
    loanId: z.string().optional(),
    penaltyId: z.string().optional(),
    shortLoanId: z.string().optional(),
    status: z.string<TransactionStatus>(),
})
