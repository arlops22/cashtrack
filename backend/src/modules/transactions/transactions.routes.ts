import { validate } from '../../shared/middlewares/validate.middleware';
import { BaseRoutes } from '../../shared/routes/base.routes';
import { createBankAccountDtoSchema } from '../bank-accounts/dto';
import { TransactionsController } from './transactions.controller';

export class TransactionsRoutes extends BaseRoutes {
    constructor(private readonly controller: TransactionsController) {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.get('', this.controller.getAll.bind(this.controller));
        this.router.post(
            '',
            validate('body', createBankAccountDtoSchema),
            this.controller.create.bind(this.controller),
        );
        this.router.patch('/:transactionId', this.controller.update.bind(this.controller));
        this.router.delete('/:transactionId', this.controller.delete.bind(this.controller));
    }
}
