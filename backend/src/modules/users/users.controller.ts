import { Request, Response } from 'express';

import { UsersService } from './users.service';
import { UnauthorizedError } from '../../shared/errors';

export class UsersController {
    constructor(private readonly service: UsersService) {}

    async me(req: Request, res: Response) {
        const { userId } = req;
        if (!userId) throw new UnauthorizedError();

        const response = await this.service.getById(userId);
        return res.status(200).json(response);
    }
}
