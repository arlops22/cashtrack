import { z } from 'zod';
import { TransactionTypeEnum } from '../enum/transaction-type';
import { PaymentMethod } from '../../../../prisma/generated/prisma/enums';

export const transactionListQueryParamSchema = z
    .object({
        type: z.enum(Object.values(TransactionTypeEnum)),
        method: z.enum(Object.values(PaymentMethod)),
        category: z.coerce.number().nonnegative(),
        isFavorite: z.enum(['true', 'false']).transform(value => value === 'true'),
        month: z.coerce.number().nonnegative(),
        year: z.coerce.number().nonnegative(),
    })
    .partial();

export type TransactionListQueryDto = z.infer<typeof transactionListQueryParamSchema>;
