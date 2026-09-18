import jwt from 'jsonwebtoken';

import { IJwtService } from './interface/jwt-service.interface';

export class JwtService implements IJwtService {
    jwtSecret: string;

    constructor(jwtSecret: string) {
        this.jwtSecret = jwtSecret;
    }

    verify(token: string): boolean {
        throw new Error('Method not implemented.');
    }

    sign(payload: string | object) {
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    }
}
