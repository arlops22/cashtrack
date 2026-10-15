import { prisma } from '../../src/shared/database/prisma-client';
import { CreateCategoryDto } from '../../src/modules/categories/dto';
import { buildCreateCategoryDto } from '../builders';

export const createTestCategory = async (overrides: Partial<CreateCategoryDto> = {}, userId: number) => {
    const data = buildCreateCategoryDto(overrides);

    return await prisma.category.create({
        data: {
            ...data,
            userId,
        },
    });
};
