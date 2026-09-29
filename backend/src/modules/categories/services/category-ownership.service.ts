import { NotFoundError } from '../../../shared/errors';
import { ICategoriesRepository } from '../interface/categories-repository';

export class CategoryOwnershipService {
    constructor(private readonly repository: ICategoriesRepository) {}

    async validate(categoryId: number, userId: number) {
        const category = await this.repository.findFirst(categoryId, userId);
        if (!category) throw new NotFoundError('category');
    }
}
