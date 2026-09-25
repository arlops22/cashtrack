import * as z from 'zod';

export const createCategoryDtoSchema = z.object({
    name: z.string().nonempty('Must not be empty'),
});

export type CreateCategoryDto = z.infer<typeof createCategoryDtoSchema>;
