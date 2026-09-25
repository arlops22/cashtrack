import { PrismaClient } from '../prisma/generated/prisma/client';

import { AuthModule } from './modules/auth/auth.module';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users/users.module';

export class AppModule {
    public readonly authRoutes;
    public readonly usersRoutes;
    public readonly bankAccountsRoutes;
    public readonly categoriesRoutes;

    constructor(
        private readonly prisma: PrismaClient,
        private readonly jwtSecret: string,
    ) {
        this.authRoutes = new AuthModule(this.prisma, this.jwtSecret).routes;
        this.usersRoutes = new UsersModule(this.prisma).routes;
        this.bankAccountsRoutes = new BankAccountsModule(this.prisma).routes;
        this.categoriesRoutes = new CategoriesModule(this.prisma).routes;
    }
}
