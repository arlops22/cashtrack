import { z } from 'zod';

export const categoryIdParamSchema = z.object({
    categoryId: z.coerce.number().nonnegative().int(),
});
