import { Role } from '@/src/generated/prisma/enums'
import z from 'zod'

export const CreateChamaSchema = z.object({
    name: z.string(),
    location: z.string(),
    minimumSavings: z
        .transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
    email: z.email(),
    phoneNumber: z.string(),
})

export const CreateMemberSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    role: z.string<Role>(),
    chamaId: z.string(),

})