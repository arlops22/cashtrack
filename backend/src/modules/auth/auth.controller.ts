import { Request, Response } from 'express';

import { AuthService } from './auth.service';

export class AuthController {
    constructor(private readonly service: AuthService) {}

    async signIn(req: Request, res: Response) {
        const response = await this.service.signIn(req.body);
        return res.status(200).json(response);
    }

    async signUp(req: Request, res: Response) {
        const response = await this.service.signUp(req.body);
        return res.status(201).json(response);
    }
}
