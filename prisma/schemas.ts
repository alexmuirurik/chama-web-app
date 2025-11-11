import z from 'zod'

export const CreateChamaSchema = z.object({
    name: z.string(),
    location: z.string(),
    minimumSavings: z
        .transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
})
