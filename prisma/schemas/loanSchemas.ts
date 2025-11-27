import z from 'zod'

export const LoanSchema = z.object({
    loanType: z.string(),
    memberId: z.string(),
    principle: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
    loanAmount: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),
    interest: z
        .transform(Number)
        .pipe(z.number().min(0, 'Please enter your price.')),

    termMonths: z
        .transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
    guarantor1: z.string(),
    guarantor2: z.string(),
    loanDocument: z.string(),
})
