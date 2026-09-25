import { validate } from '../../shared/middlewares/validate.middleware';
import { BaseRoutes } from '../../shared/routes/base.routes';

import { categoryIdParamSchema, createCategoryDtoSchema, updateCategoryDtoSchema } from './dto';
import { CategoriesController } from './categories.controller';

export class CategoriesRoutes extends BaseRoutes {
    constructor(private readonly controller: CategoriesController) {
        super();

        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.get('', this.controller.getAll.bind(this.controller));
        this.router.post('', validate('body', createCategoryDtoSchema), this.controller.create.bind(this.controller));
        this.router.patch(
            '/:categoryId',
            validate('body', updateCategoryDtoSchema),
            validate('params', categoryIdParamSchema),
            this.controller.update.bind(this.controller),
        );
        this.router.delete(
            '/:categoryId',
            validate('params', categoryIdParamSchema),
            this.controller.delete.bind(this.controller),
        );
    }
}
