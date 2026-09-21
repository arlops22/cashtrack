import jwt from 'jsonwebtoken';

import { IJwtService } from './interface/jwt-service.interface';

export class JwtService implements IJwtService {
    jwtSecret: string;

    constructor(jwtSecret: string) {
        this.jwtSecret = jwtSecret;
    }

    verify(token: string): jwt.JwtPayload {
        return jwt.verify(token, this.jwtSecret) as jwt.JwtPayload;
    }

    sign(payload: string | object): string {
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    }
}
