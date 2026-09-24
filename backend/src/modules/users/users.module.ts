import { PrismaClient } from '../../../prisma/generated/prisma/client';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersRoutes } from './users.routes';
import { UsersService } from './users.service';

export class UsersModule {
    public readonly routes: UsersRoutes;

    constructor(private readonly prisma: PrismaClient) {
        const repository = new UsersRepository(this.prisma);
        const service = new UsersService(repository);
        const controller = new UsersController(service);
        this.routes = new UsersRoutes(controller);
    }
}
