import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { AuthRoutes } from './auth.routes';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/user.repository';
import { JwtService } from '../../shared/auth/jwt.service';

export class AuthModule {
    public readonly routes: AuthRoutes;

    constructor(
        private readonly prisma: PrismaClient,
        private readonly jwtSecret: string,
    ) {
        const jwtService = new JwtService(this.jwtSecret);
        const repository = new UserRepository(this.prisma);
        const service = new AuthService(repository, jwtService);
        const controller = new AuthController(service);
        this.routes = new AuthRoutes(controller);
    }
}
