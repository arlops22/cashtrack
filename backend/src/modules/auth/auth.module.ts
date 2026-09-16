import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { AuthRoutes } from './auth.routes';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

export class AuthModule {
    public readonly routes: AuthRoutes;

    constructor(private readonly prisma: PrismaClient) {
        const repository = new UserRepository(this.prisma);
        const service = new AuthService(repository);
        const controller = new AuthController(service);
        this.routes = new AuthRoutes(controller);
    }
}
