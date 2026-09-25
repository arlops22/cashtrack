import { NotFoundError } from '../../shared/errors';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ICategoriesRepository } from './interface/categories-repository';

export class CategoriesService {
    constructor(private readonly repository: ICategoriesRepository) {}

    getListByUserId(userId: number) {
        return this.repository.findMany(userId);
    }

    create(createDto: CreateCategoryDto, userId: number) {
        return this.repository.create(createDto, userId);
    }

    async update(updateDto: UpdateCategoryDto, categoryId: number, userId: number) {
        await this.validateOwnership(categoryId, userId);
        return this.repository.update(updateDto, categoryId);
    }

    async delete(categoryId: number, userId: number) {
        await this.validateOwnership(categoryId, userId);
        return this.repository.delete(categoryId);
    }

    private async validateOwnership(categoryId: number, userId: number) {
        const category = await this.repository.findFirst(categoryId, userId);
        if (!category) throw new NotFoundError('category');
    }
}
