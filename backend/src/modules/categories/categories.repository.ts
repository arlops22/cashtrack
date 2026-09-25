import { PrismaClient } from '../../../prisma/generated/prisma/client';
import { Category } from '../../shared/entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ICategoriesRepository } from './interface/categories-repository';

export class CategoriesRepository implements ICategoriesRepository {
    constructor(private readonly prisma: PrismaClient) {}

    create(createDto: CreateCategoryDto, userId: number): Promise<Category> {
        const { name } = createDto;

        return this.prisma.category.create({
            data: {
                userId,
                name,
            },
        });
    }

    findMany(userId: number): Promise<Category[]> {
        return this.prisma.category.findMany({
            where: { userId },
        });
    }

    findFirst(categoryId: number, userId: number): Promise<Category | null> {
        return this.prisma.category.findFirst({
            where: { id: categoryId, userId },
        });
    }

    update(updateDto: UpdateCategoryDto, categoryId: number): Promise<Category> {
        const { name } = updateDto;

        return this.prisma.category.update({
            where: { id: categoryId },
            data: { name },
        });
    }

    delete(categoryId: number): Promise<Category> {
        return this.prisma.category.delete({
            where: { id: categoryId },
        });
    }
}
