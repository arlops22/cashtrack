import { BaseRoutes } from '../../shared/routes/base.routes';
import { UsersController } from './users.controller';

export class UsersRoutes extends BaseRoutes {
    constructor(private readonly usersController: UsersController) {
        super();

        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.get('', this.usersController.me.bind(this.usersController));
    }
}
