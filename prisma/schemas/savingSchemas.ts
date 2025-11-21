import { TransactionStatus } from "@/src/generate/prisma/enums";
import z from "zod";

export const CreateSavingSchema = z.object({
    memberId: z.string(),
    deductionId: z.string().optional(),
    amount: z.transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
    savings: z.transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
    welfare: z.transform(Number)
        .pipe(z.number().min(1, 'Please enter your price.')),
    status: z.string<TransactionStatus>()
})