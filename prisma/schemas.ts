import z from 'zod'

export const CreateChamaSchema = z.object({
    name: z.string(),
    location: z.string(),
    minimumSavings: z.any(),
})

