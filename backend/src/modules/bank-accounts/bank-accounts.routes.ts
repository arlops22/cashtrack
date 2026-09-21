import { BaseRoutes } from '../../shared/routes/base.routes';
import { BankAccountsController } from './bank-accounts.controller';

export class BankAccountsRoutes extends BaseRoutes {
    constructor(private readonly bankAccountsController: BankAccountsController) {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.post('', this.bankAccountsController.create.bind(this.bankAccountsController));
        this.router.patch('/:id', this.bankAccountsController.update.bind(this.bankAccountsController));
        this.router.delete('', this.bankAccountsController.delete.bind(this.bankAccountsController));
    }
}
