import { Router } from 'express';

import { validate } from '../../shared/middlewares/validate.middleware';
import { TransactionsController } from './transactions.controller';
import { createTransactionDtoSchema, transactionIdParamSchema, transactionListQueryParamSchema } from './dto';

export class TransactionsRoutes {
    public readonly router: Router;

    constructor(private readonly controller: TransactionsController) {
        this.router = Router({ mergeParams: true });
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.get(
            '',
            validate('query', transactionListQueryParamSchema),
            this.controller.getAll.bind(this.controller),
        );
        this.router.post(
            '',
            validate('body', createTransactionDtoSchema),
            this.controller.create.bind(this.controller),
        );
        this.router.patch(
            '/:transactionId',
            validate('params', transactionIdParamSchema),
            this.controller.update.bind(this.controller),
        );
        this.router.delete(
            '/:transactionId',
            validate('params', transactionIdParamSchema),
            this.controller.delete.bind(this.controller),
        );
    }
}
