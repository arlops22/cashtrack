import { AuthController } from './auth.controller';
import { BaseRoutes } from '../../shared/routes/base.routes';

export class AuthRoutes extends BaseRoutes {
    constructor(private readonly authController: AuthController) {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.post('/sign-up', this.authController.signUp);
        this.router.post('/sign-in', this.authController.signIn);
    }
}
