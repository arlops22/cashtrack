import { Category } from '../../../shared/entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';

export interface ICategoriesRepository {
    findMany(userId: number): Promise<Category[]>;
    findFirst(categoryId: number, userId: number): Promise<Category | null>;
    create(createDto: CreateCategoryDto, userId: number): Promise<Category>;
    update(updateDto: UpdateCategoryDto, categoryId: number): Promise<Category>;
    delete(categoryId: number): Promise<Category>;
}
