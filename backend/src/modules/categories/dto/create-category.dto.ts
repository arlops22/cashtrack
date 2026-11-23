import * as z from 'zod';

export const createCategoryDtoSchema = z.object({
    name: z.string().nonempty('Must not be empty'),
    color: z.string().regex(/^#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, 'Must be a valid hex color (e.g. #FF5733)'),
});

export type CreateCategoryDto = z.infer<typeof createCategoryDtoSchema>;
