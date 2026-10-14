import { describe, expect, it } from 'vitest';
import request from 'supertest';

import { buildTestServer, createAuthenticatedUser } from '../helpers';

describe('Users Module', () => {
    const server = buildTestServer();

    describe('GET /me', () => {
        it('should return user without error', async () => {
            const { user, authHeader } = await createAuthenticatedUser();

            const { status, body } = await request(server).get('/me').set('Authorization', authHeader);

            expect(status).toBe(200);
            expect(body).toMatchObject({ id: user.id, email: user.email });
            expect(body).not.toHaveProperty('password');
        });

        it('should return unauthorized when no token is provided', async () => {
            const { status } = await request(server).get('/me');

            expect(status).toBe(401);
        });

        it('should return unauthorized when the token is invalid', async () => {
            const { status } = await request(server).get('/me').set('Authorization', 'Bearer invalid.token.here');

            expect(status).toBe(401);
        });
    });
});
