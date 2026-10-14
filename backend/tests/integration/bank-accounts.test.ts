import { describe, expect, it } from 'vitest';
import request from 'supertest';

import { prisma } from '../../src/shared/database/prisma-client';
import { buildTestServer, createAuthenticatedUser, createTestBankAccount, createTestUser } from '../helpers';
import { buildCreateBankAccountDto } from '../builders';

describe('Bank Accounts Module', () => {
    const server = buildTestServer();

    describe('POST /bank-accounts', () => {
        it('should create a bank account without error', async () => {
            const { user, authHeader } = await createAuthenticatedUser();
            const payload = buildCreateBankAccountDto();

            const { status, body } = await request(server)
                .post('/bank-accounts')
                .send(payload)
                .set('Authorization', authHeader);
            const saved = await prisma.bankAccount.findUnique({ where: { id: body.id } });

            expect(status).toBe(201);
            expect(body).toMatchObject({
                name: payload.name,
                currentBalance: payload.initialBalance,
                initialBalance: payload.initialBalance,
                color: payload.color,
                type: payload.type,
                userId: user.id,
            });
            expect(body.id).toEqual(expect.any(Number));
            expect(saved).not.toBeNull();
            expect(saved!.userId).toBe(user.id);
        });

        it('should return validation error when invalid data is provided', async () => {
            const { authHeader } = await createAuthenticatedUser();
            const payload = {
                name: 'Test',
            };

            const { status, body } = await request(server)
                .post('/bank-accounts')
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid body');
        });

        it('should return unauthorized when no token is provided', async () => {
            const { status } = await request(server).post('/bank-accounts').send(buildCreateBankAccountDto());

            expect(status).toBe(401);
        });
    });

    describe('PATCH /bank-accounts/:id', () => {
        it('should update a bank account without error', async () => {
            const { user, authHeader } = await createAuthenticatedUser();
            const bankAccount = await createTestBankAccount({}, user.id);
            const payload = {
                name: 'Updated Account',
            };

            const { status, body } = await request(server)
                .patch('/bank-accounts/' + bankAccount.id)
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(200);
            expect(body).toMatchObject({
                id: bankAccount.id,
                name: payload.name,
                currentBalance: bankAccount.currentBalance,
                initialBalance: bankAccount.initialBalance,
                color: bankAccount.color,
                type: bankAccount.type,
                userId: user.id,
            });
        });

        it('should return validation error when invalid data is provided', async () => {
            const { user, authHeader } = await createAuthenticatedUser();
            const bankAccount = await createTestBankAccount({}, user.id);
            const payload = {
                name: '',
            };

            const { status, body } = await request(server)
                .patch('/bank-accounts/' + bankAccount.id)
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid body');
        });

        it('should return not found error when the user is not the owner of the provided bank account', async () => {
            const { user: owner } = await createTestUser({ email: 'owner@email.com' });
            const { authHeader: intruderAuth } = await createAuthenticatedUser();
            const bankAccount = await createTestBankAccount({}, owner.id);
            const payload = {
                name: 'Updated Account',
            };

            const { status, body } = await request(server)
                .patch('/bank-accounts/' + bankAccount.id)
                .send(payload)
                .set('Authorization', intruderAuth);

            expect(status).toBe(404);
            expect(body.error).toBe('bank account not found!');
        });
    });

    describe('DELETE /bank-accounts/:id', () => {
        it.todo('should delete a bank account without error', () => {});
        it.todo(
            'should return unauthorized error when the user is not the owner of the provided bank account',
            () => {},
        );
    });
});
