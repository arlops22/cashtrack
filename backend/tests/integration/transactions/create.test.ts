import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { buildCreateTransactionDto } from '../../builders';
import { buildTestServer } from '../../helpers';
import { BankAccount, Category, User } from '../../../src/shared/entities';
import { createAuthenticatedUser, createTestBankAccount, createTestCategory, createTestUser } from '../../factories';
import { prisma } from '../../../src/shared/database/prisma-client';

describe('POST /bank-accounts/:id/transactions', () => {
    const server = buildTestServer();
    let user: User, authHeader: string, bankAccount: BankAccount, category: Category;

    beforeEach(async () => {
        ({ user, authHeader } = await createAuthenticatedUser());
        bankAccount = await createTestBankAccount({}, user.id);
        category = await createTestCategory({}, user.id);
    });

    it('should create a transaction and return 201', async () => {
        const payload = buildCreateTransactionDto({}, category.id);

        const { status, body } = await request(server)
            .post(`/bank-accounts/${bankAccount.id}/transactions`)
            .send(payload)
            .set('Authorization', authHeader);
        const saved = await prisma.transaction.findUnique({ where: { id: body.id } });

        expect(status).toBe(201);
        expect(body).toMatchObject({
            name: payload.name,
            amount: payload.amount,
            createdAt: payload.createdAt,
            isFavorite: payload.isFavorite,
            type: payload.type,
            method: payload.method,
        });
        expect(saved).not.toBeNull();
        expect(saved!.bankAccountId).toBe(bankAccount.id);
    });

    it('should return validation error when invalid data is provided', async () => {
        const payload = {
            name: 'Test',
        };

        const { status, body } = await request(server)
            .post(`/bank-accounts/${bankAccount.id}/transactions`)
            .send(payload)
            .set('Authorization', authHeader);

        expect(status).toBe(400);
        expect(body.error).toBe('Invalid body');
    });

    it('should return validation error when invalid params is provided', async () => {
        const payload = buildCreateTransactionDto({}, category.id);

        const { status, body } = await request(server)
            .post('/bank-accounts/abc/transactions')
            .send(payload)
            .set('Authorization', authHeader);

        expect(status).toBe(400);
        expect(body.error).toBe('Invalid params');
    });

    it('should return not found error when the user is not the owner of the provided bank account', async () => {
        const payload = buildCreateTransactionDto({}, category.id);
        const { user: ownerUser } = await createTestUser({ email: 'owner@email.com' });
        const ownerBankAccount = await createTestBankAccount({}, ownerUser.id);

        const { status, body } = await request(server)
            .post(`/bank-accounts/${ownerBankAccount.id}/transactions`)
            .send(payload)
            .set('Authorization', authHeader);

        expect(status).toBe(404);
        expect(body.error).toBe('bank account not found!');
    });

    it('should return not found error when the user is not the owner of the provided category', async () => {
        const { user: ownerUser } = await createTestUser({ email: 'owner@email.com' });
        const ownerCategory = await createTestCategory({}, ownerUser.id);
        const payload = buildCreateTransactionDto({}, ownerCategory.id);

        const { status, body } = await request(server)
            .post(`/bank-accounts/${bankAccount.id}/transactions`)
            .send(payload)
            .set('Authorization', authHeader);

        expect(status).toBe(404);
        expect(body.error).toBe('category not found!');
    });

    it('should return unauthorized when no token is provided', async () => {
        const payload = buildCreateTransactionDto({}, category.id);

        const { status } = await request(server).post(`/bank-accounts/${bankAccount.id}/transactions`).send(payload);

        expect(status).toBe(401);
    });

    it.todo('should update bank account current balance successfuly', async () => {});
});
