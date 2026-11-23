import { CreateCategoryDto } from '../../src/modules/categories/dto';

export const buildCreateCategoryDto = (overrides: Partial<CreateCategoryDto> = {}): CreateCategoryDto => ({
    name: 'Test Category',
    color: '#000000',
    ...overrides,
});
