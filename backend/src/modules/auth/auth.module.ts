import { AuthController } from './auth.controller';
import { AuthRoutes } from './auth.routes';

export class AuthModule {
    public readonly routes: AuthRoutes;

    constructor() {
        const controller = new AuthController();
        this.routes = new AuthRoutes(controller);
    }
}
