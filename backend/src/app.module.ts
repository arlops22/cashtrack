import { PrismaClient } from '../prisma/generated/prisma/client';

import { AuthModule } from './modules/auth/auth.module';

export class AppModule {
    public readonly authRoutes;

    constructor(
        private readonly prisma: PrismaClient,
        private readonly jwtSecret: string,
    ) {
        this.authRoutes = new AuthModule(this.prisma, this.jwtSecret).routes;
    }
}
