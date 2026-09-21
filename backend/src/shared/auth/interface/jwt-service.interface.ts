export interface IJwtService {
    jwtSecret: string;
    sign(payload: any): void;
    verify(token: string): boolean;
}
