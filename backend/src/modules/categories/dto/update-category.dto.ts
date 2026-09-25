import { CreateCategoryDto, createCategoryDtoSchema } from './create-category.dto';

export const updateCategoryDtoSchema = createCategoryDtoSchema.partial();

export type UpdateCategoryDto = CreateCategoryDto;
