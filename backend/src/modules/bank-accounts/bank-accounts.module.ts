import { PrismaClient } from '../../../prisma/generated/prisma/client';
import { TransactionsRoutes } from '../transactions/transactions.routes';

import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsRepository } from './bank-accounts.repository';
import { BankAccountsRoutes } from './bank-accounts.routes';
import { BankAccountOwnershipService } from './services/bank-account-ownership.service';
import { BankAccountsService } from './services/bank-accounts.service';

export class BankAccountsModule {
    public readonly routes: BankAccountsRoutes;

    constructor(
        private readonly prisma: PrismaClient,
        private readonly transactionsRoutes: TransactionsRoutes,
    ) {
        const repository = new BankAccountsRepository(this.prisma);
        const ownershipService = new BankAccountOwnershipService(repository);
        const service = new BankAccountsService(repository, ownershipService);
        const controller = new BankAccountsController(service);
        this.routes = new BankAccountsRoutes(controller, this.transactionsRoutes);
    }
}
