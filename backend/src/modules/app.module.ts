import { AuthModule } from './auth/auth.module';

export class AppModule {
    public readonly authRoutes;

    constructor() {
        this.authRoutes = new AuthModule().routes;
    }
}
