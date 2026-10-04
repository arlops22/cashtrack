import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { ICategoriesRepository } from '../interface/categories-repository';
import { CategoryOwnershipService } from './category-ownership.service';

export class CategoriesService {
    constructor(
        private readonly repository: ICategoriesRepository,
        private readonly categoryOwnershipService: CategoryOwnershipService,
    ) {}

    getListByUserId(userId: number) {
        return this.repository.findMany(userId);
    }

    create(createDto: CreateCategoryDto, userId: number) {
        return this.repository.create(createDto, userId);
    }

    async update(updateDto: UpdateCategoryDto, categoryId: number, userId: number) {
        await this.categoryOwnershipService.validate(categoryId, userId);
        return this.repository.update(updateDto, categoryId);
    }

    async delete(categoryId: number, userId: number) {
        await this.categoryOwnershipService.validate(categoryId, userId);
        return this.repository.delete(categoryId);
    }
}
