import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsRepository } from './bank-accounts.repository';
import { BankAccountsRoutes } from './bank-accounts.routes';
import { BankAccountsService } from './bank-accounts.service';

export class BankAccountsModule {
    public readonly routes: BankAccountsRoutes;

    constructor(private readonly prisma: PrismaClient) {
        const repository = new BankAccountsRepository(this.prisma);
        const service = new BankAccountsService(repository);
        const controller = new BankAccountsController(service);
        this.routes = new BankAccountsRoutes(controller);
    }
}
