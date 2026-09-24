import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '../errors';
import { IJwtService } from '../auth/interface/jwt-service.interface';

export const authenticate = (jwtService: IJwtService) => {
    return (req: Request, _: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new UnauthorizedError();

        const token = authHeader.split(' ')[1];
        if (!token) throw new UnauthorizedError();

        const payload = jwtService.verify(token);

        req.userId = parseInt(payload.sub as string);
        next();
    };
};
