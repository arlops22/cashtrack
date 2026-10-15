import { describe, expect, it } from 'vitest';
import request from 'supertest';

import { SignInDto } from '../../src/modules/auth/dto/sign-in.dto';
import { buildCreateUserDto } from '../builders';
import { createTestUser } from '../factories';
import { buildTestServer } from '../helpers';

describe('Auth Module', () => {
    const server = buildTestServer();

    describe('POST /auth/sign-up', () => {
        it('should create a user and return an access token', async () => {
            const payload = buildCreateUserDto();

            const { status, body } = await request(server).post('/auth/sign-up').send(payload);

            expect(status).toBe(201);
            expect(body).toEqual({ accessToken: expect.any(String) });
        });

        it('should return a validation error when invalid data is provided', async () => {
            const payload = {
                firstName: 'Test',
                password: 'test123',
            };

            const { status, body } = await request(server).post('/auth/sign-up').send(payload);

            expect(status).toBe(400);
            expect(body).toBeDefined();
            expect(body.error).toBe('Invalid user data');
        });

        it('should return conflict error when the e-mail is already registered', async () => {
            await createTestUser();
            const payload = buildCreateUserDto();

            const { status, body } = await request(server).post('/auth/sign-up').send(payload);

            expect(status).toBe(409);
            expect(body.error).toBe('This e-mail is already in use!');
        });
    });

    describe('POST /auth/sign-in', () => {
        it('should authenticate the user and return an access token', async () => {
            const { user, plainPassword } = await createTestUser({});
            const payload: SignInDto = {
                email: user.email,
                password: plainPassword,
            };

            const { status, body } = await request(server).post('/auth/sign-in').send(payload);

            expect(status).toBe(200);
            expect(body).toEqual({ accessToken: expect.any(String) });
        });

        it('should return a validation error when a invalid data is provided', async () => {
            const payload = {
                email: 'test',
                password: 'test123',
            };

            const { status, body } = await request(server).post('/auth/sign-in').send(payload);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid credentials');
        });

        it('should return unauthorized error when the e-mail is not registered', async () => {
            const payload = {
                email: 'test2@email.com',
                password: 'test123123',
            };

            const { status, body } = await request(server).post('/auth/sign-in').send(payload);

            expect(status).toBe(401);
            expect(body.error).toBe('Invalid credentials');
        });

        it('should return unauthorized error when the password is incorrect', async () => {
            await createTestUser({});
            const payload: SignInDto = {
                email: 'test@email.com',
                password: '123123',
            };

            const { status, body } = await request(server).post('/auth/sign-in').send(payload);

            expect(status).toBe(401);
            expect(body.error).toBe('Invalid credentials');
        });
    });
});
