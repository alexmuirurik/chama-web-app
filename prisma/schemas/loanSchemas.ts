import z from 'zod'

export type LoanType = 'LONG_TERM' | 'SHORT_TERM'

export const LoanSchema = z.object({
    loanType: z.string<LoanType>(),
    memberId: z.string(),
    loanAmount: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
    termMonths: z
        .transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
    guarantors: z.array(z.string()).min(2, 'Please select two guarantors.'),
    loanDocument: z.string().optional(),
})
