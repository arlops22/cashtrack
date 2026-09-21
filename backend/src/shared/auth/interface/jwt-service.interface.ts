import jwt from 'jsonwebtoken';

export interface IJwtService {
    jwtSecret: string;
    sign(payload: string | object): string;
    verify(token: string): jwt.JwtPayload;
}
