import { z } from 'zod';

export const bankAccountIdParamSchema = z.object({
    bankAccountId: z.coerce.number().nonnegative().int(),
});
