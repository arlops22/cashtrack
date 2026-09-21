import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsRoutes } from './bank-accounts.routes';
import { BankAccountsService } from './bank-accounts.service';

export class BankAccountsModule {
    public readonly routes: BankAccountsRoutes;

    constructor() {
        const service = new BankAccountsService();
        const controller = new BankAccountsController(service);
        this.routes = new BankAccountsRoutes(controller);
    }
}
