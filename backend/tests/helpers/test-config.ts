const secret = process.env.JWT_SECRET;
if (!secret) throw new Error('JWT_SECRET não definido no .env.test');

export const TEST_JWT_SECRET = secret;
