import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { prisma } from '../../src/shared/database/prisma-client';
import { createAuthenticatedUser, createTestBankAccount, createTestTransaction, createTestUser } from '../factories';
import { buildCreateBankAccountDto } from '../builders';
import { buildTestServer } from '../helpers';
import { BankAccount, User } from '../../src/shared/entities';

describe('Bank Accounts Module', () => {
    const server = buildTestServer();
    let user: User, authHeader: string, bankAccount: BankAccount;

    beforeEach(async () => {
        ({ user, authHeader } = await createAuthenticatedUser());
        bankAccount = await createTestBankAccount({}, user.id);
    });

    describe('POST /bank-accounts', () => {
        it('should create a bank account and return 201', async () => {
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

        it.each([
            ['missing required fields', { name: 'Test' }],
            ['empty name is provided', buildCreateBankAccountDto({ name: '' })],
            ['empty color is provided', buildCreateBankAccountDto({ color: '' })],
            ['invalid account type is provided', { ...buildCreateBankAccountDto(), type: 'INVALID' }],
            ['non-numeric initial balance is provided', { ...buildCreateBankAccountDto(), initialBalance: 'abc' }],
        ])('should return validation error when %s', async (_, payload) => {
            const { status, body } = await request(server)
                .post('/bank-accounts')
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid body');
            expect(body.details).toBeDefined();
        });

        it('should return unauthorized when no token is provided', async () => {
            const { status } = await request(server).post('/bank-accounts').send(buildCreateBankAccountDto());

            expect(status).toBe(401);
        });
    });

    describe('PATCH /bank-accounts/:id', () => {
        it('should update a bank account and return 200', async () => {
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

        it.each([
            ['empty name is provided', buildCreateBankAccountDto({ name: '' })],
            ['empty color is provided', buildCreateBankAccountDto({ color: '' })],
            ['invalid account type is provided', { ...buildCreateBankAccountDto(), type: 'INVALID' }],
            ['non-numeric initial balance is provided', { ...buildCreateBankAccountDto(), initialBalance: 'abc' }],
        ])('should return validation error when %s', async (_, payload) => {
            const { status, body } = await request(server)
                .post('/bank-accounts')
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid body');
            expect(body.details).toBeDefined();
        });

        it('should return validation error when invalid params is provided', async () => {
            const payload = {
                name: 'Updated Account',
            };

            const { status, body } = await request(server)
                .patch('/bank-accounts/abc')
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid params');
        });

        it('should return not found error when the user is not the owner of the provided bank account', async () => {
            const { user: owner } = await createTestUser({ email: 'owner@email.com' });
            const ownerBankAccount = await createTestBankAccount({}, owner.id);
            const payload = {
                name: 'Updated Account',
            };

            const { status, body } = await request(server)
                .patch('/bank-accounts/' + ownerBankAccount.id)
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(404);
            expect(body.error).toBe('bank account not found!');
        });

        it('should return unauthorized when no token is provided', async () => {
            const { status } = await request(server)
                .patch('/bank-accounts/' + bankAccount.id)
                .send(buildCreateBankAccountDto());

            expect(status).toBe(401);
        });
    });

    describe('DELETE /bank-accounts/:id', () => {
        it('should delete the bank account and return 204', async () => {
            const { status, body } = await request(server)
                .delete('/bank-accounts/' + bankAccount.id)
                .set('Authorization', authHeader);

            const persistedBankAccount = await prisma.bankAccount.findUnique({
                where: { id: bankAccount.id },
            });

            expect(status).toBe(204);
            expect(body).toEqual({});
            expect(persistedBankAccount).toBeNull();
        });

        it('should return not found error when the user is not the owner of the provided bank account', async () => {
            const { user: owner } = await createTestUser({ email: 'owner@email.com' });
            const ownerBankAccount = await createTestBankAccount({}, owner.id);

            const { status, body } = await request(server)
                .delete('/bank-accounts/' + ownerBankAccount.id)
                .set('Authorization', authHeader);

            expect(status).toBe(404);
            expect(body.error).toBe('bank account not found!');

            const persisted = await prisma.bankAccount.findUnique({
                where: { id: ownerBankAccount.id },
            });
            expect(persisted).not.toBeNull();
        });

        it('should return unauthorized when no token is provided', async () => {
            const { status } = await request(server).delete('/bank-accounts/' + bankAccount.id);

            expect(status).toBe(401);

            const persisted = await prisma.bankAccount.findUnique({
                where: { id: bankAccount.id },
            });
            expect(persisted).not.toBeNull();
        });

        it('should return validation error when invalid params is provided', async () => {
            const { status, body } = await request(server)
                .delete('/bank-accounts/abc')
                .set('Authorization', authHeader);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid params');
        });

        it('should delete the bank account transactions (cascade)', async () => {
            const transaction = await createTestTransaction({}, bankAccount.id);
            const otherAccount = await createTestBankAccount({}, user.id);
            const untouchedTransaction = await createTestTransaction({}, otherAccount.id);

            const { status } = await request(server)
                .delete('/bank-accounts/' + bankAccount.id)
                .set('Authorization', authHeader);

            const persistedTransaction = await prisma.transaction.findUnique({
                where: { id: transaction.id },
            });
            const stillThere = await prisma.transaction.findUnique({ where: { id: untouchedTransaction.id } });

            expect(status).toBe(204);
            expect(persistedTransaction).toBeNull();
            expect(stillThere).not.toBeNull();
        });
    });
});
