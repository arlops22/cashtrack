import * as z from 'zod';
import { TransactionTypeEnum } from '../enum/transaction-type';
import { PaymentMethodEnum } from '../enum/payment-method';

export const createTransactionDtoSchema = z.object({
    categoryId: z.number().nonnegative().nullable(),
    name: z.string().nonempty('Must not be empty'),
    amount: z.number().nonnegative(),
    createdAt: z.iso.datetime(),
    type: z.enum(Object.values(TransactionTypeEnum)),
    method: z.enum(Object.values(PaymentMethodEnum)),
    isFavorite: z.boolean(),
});

export type CreateTransactionDto = z.infer<typeof createTransactionDtoSchema>;
