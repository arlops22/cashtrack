import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { CategoriesRoutes } from './categories.routes';
import { CategoriesService } from './services/categories.service';
import { CategoryOwnershipService } from './services/category-ownership.service';

export class CategoriesModule {
    public readonly routes: CategoriesRoutes;

    constructor(private readonly prisma: PrismaClient) {
        const repository = new CategoriesRepository(this.prisma);
        const ownershipService = new CategoryOwnershipService(repository);
        const service = new CategoriesService(repository, ownershipService);
        const controller = new CategoriesController(service);
        this.routes = new CategoriesRoutes(controller);
    }
}
