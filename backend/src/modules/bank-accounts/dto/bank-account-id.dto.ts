import { z } from 'zod';

export const bankAccountIdParamSchema = z.object({
    bankAccountId: z.number().nonnegative(),
});
