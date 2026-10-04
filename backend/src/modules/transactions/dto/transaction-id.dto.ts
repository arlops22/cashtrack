import { z } from 'zod';

export const transactionIdParamSchema = z.object({
    transactionId: z.coerce.number().nonnegative().int(),
});
