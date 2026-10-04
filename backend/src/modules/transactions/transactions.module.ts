import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { BankAccountsRepository } from '../bank-accounts/bank-accounts.repository';
import { BankAccountOwnershipService } from '../bank-accounts/services/bank-account-ownership.service';

import { CategoriesRepository } from '../categories/categories.repository';
import { CategoryOwnershipService } from '../categories/services/category-ownership.service';

import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRoutes } from './transactions.routes';

export class TransactionsModule {
    public readonly routes: TransactionsRoutes;

    constructor(private readonly prisma: PrismaClient) {
        const bankAccountRepo = new BankAccountsRepository(this.prisma);
        const categoryRepo = new CategoriesRepository(this.prisma);
        const transactionsRepo = new TransactionsRepository(this.prisma);
        const bankAccountOwnershipService = new BankAccountOwnershipService(bankAccountRepo);
        const categoryOwnershipService = new CategoryOwnershipService(categoryRepo);
        const transactionsService = new TransactionsService(
            transactionsRepo,
            bankAccountOwnershipService,
            categoryOwnershipService,
        );
        const controller = new TransactionsController(transactionsService);
        this.routes = new TransactionsRoutes(controller);
    }
}
