import { BaseRoutes } from '../../shared/routes/base.routes';
import { validate } from '../../shared/middlewares/validate.middleware';
import { BankAccountsController } from './bank-accounts.controller';
import { bankAccountIdParamSchema, createBankAccountDtoSchema, updateBankAccountDtoSchema } from './dto';

export class BankAccountsRoutes extends BaseRoutes {
    constructor(private readonly bankAccountsController: BankAccountsController) {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.post(
            '',
            validate('body', createBankAccountDtoSchema),
            this.bankAccountsController.create.bind(this.bankAccountsController),
        );
        this.router.patch(
            '/:bankAccountId',
            validate('params', bankAccountIdParamSchema),
            validate('body', updateBankAccountDtoSchema),
            this.bankAccountsController.update.bind(this.bankAccountsController),
        );
        this.router.delete('/:bankAccountId', this.bankAccountsController.delete.bind(this.bankAccountsController));
    }
}
