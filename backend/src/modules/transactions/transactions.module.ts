import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsRoutes } from './transactions.routes';
import { TransactionsService } from './transactions.service';

export class TransactionsModule {
    public readonly routes: TransactionsRoutes;

    constructor(private readonly prisma: PrismaClient) {
        const repository = new TransactionsRepository(this.prisma);
        const service = new TransactionsService(repository);
        const controller = new TransactionsController(service);
        this.routes = new TransactionsRoutes(controller);
    }
}
