import * as z from 'zod';

import { PaymentMethod, TransactionType } from '../../../../prisma/generated/prisma/enums';

export const createTransactionDtoSchema = z.object({
    categoryId: z.number().nonnegative().nullable(),
    name: z.string().nonempty('Must not be empty'),
    amount: z.number().nonnegative(),
    createdAt: z.iso.date(),
    type: z.enum(Object.values(TransactionType)),
    method: z.enum(Object.values(PaymentMethod)),
});

export type CreateTransactionDto = z.infer<typeof createTransactionDtoSchema>;
