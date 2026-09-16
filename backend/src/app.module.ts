import { PrismaClient } from '../prisma/generated/prisma/client';

import { AuthModule } from './modules/auth/auth.module';

export class AppModule {
    public readonly authRoutes;

    constructor(private readonly prisma: PrismaClient) {
        this.authRoutes = new AuthModule(this.prisma).routes;
    }
}
