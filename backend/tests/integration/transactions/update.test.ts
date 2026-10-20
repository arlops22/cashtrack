import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { buildCreateTransactionDto } from '../../builders';
import { buildTestServer } from '../../helpers';
import { BankAccount, Category, Transaction, User } from '../../../src/shared/entities';
import {
    createAuthenticatedUser,
    createTestBankAccount,
    createTestCategory,
    createTestTransaction,
    createTestUser,
} from '../../factories';

describe('PATCH /bank-accounts/:id/transactions/:id', () => {
    const server = buildTestServer();
    let user: User, authHeader: string, bankAccount: BankAccount, category: Category, transaction: Transaction;

    beforeEach(async () => {
        ({ user, authHeader } = await createAuthenticatedUser());
        bankAccount = await createTestBankAccount({}, user.id);
        category = await createTestCategory({}, user.id);
        transaction = await createTestTransaction({}, bankAccount.id, category.id);
    });

    it('should update a transaction and return 200', async () => {
        const payload = buildCreateTransactionDto({}, category.id);

        const { status, body } = await request(server)
            .patch(`/bank-accounts/${bankAccount.id}/transactions/${transaction.id}`)
            .send(payload)
            .set('Authorization', authHeader);

        expect(status).toBe(200);
        expect(body).toMatchObject({
            name: payload.name,
            amount: payload.amount,
            createdAt: payload.createdAt,
            isFavorite: payload.isFavorite,
            type: payload.type,
            method: payload.method,
        });
    });

    it.todo('should update bank account current balance without error', async () => {});

    it('should return validation error when invalid data is provided', async () => {
        const payload = {
            name: '',
        };

        const { status, body } = await request(server)
            .patch(`/bank-accounts/${bankAccount.id}/transactions/${transaction.id}`)
            .send(payload)
            .set('Authorization', authHeader);

        expect(status).toBe(400);
        expect(body.error).toBe('Invalid body');
    });

    it('should return validation error when invalid params is provided', async () => {
        const payload = buildCreateTransactionDto({}, category.id);

        const { status, body } = await request(server)
            .patch('/bank-accounts/abc/transactions/def')
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
            .patch(`/bank-accounts/${ownerBankAccount.id}/transactions/${transaction.id}`)
            .send(payload)
            .set('Authorization', authHeader);

        expect(status).toBe(404);
        expect(body.error).toBe('bank account not found!');
    });

    it('should return not found error when the bank account is not the owner of the provided transaction', async () => {
        const payload = buildCreateTransactionDto({}, category.id);
        const ownerBankAccount = await createTestBankAccount({}, user.id);
        const ownerTransaction = await createTestTransaction({}, ownerBankAccount.id, category.id);

        const { status, body } = await request(server)
            .patch(`/bank-accounts/${bankAccount.id}/transactions/${ownerTransaction.id}`)
            .send(payload)
            .set('Authorization', authHeader);

        expect(status).toBe(404);
        expect(body.error).toBe('transaction not found!');
    });

    it('should return not found error when the transaction is not the owner of the provided category', async () => {
        const { user: ownerUser } = await createTestUser({ email: 'owner@email.com' });
        const ownerCategory = await createTestCategory({}, ownerUser.id);
        const payload = buildCreateTransactionDto({}, ownerCategory.id);

        const { status, body } = await request(server)
            .patch(`/bank-accounts/${bankAccount.id}/transactions/${transaction.id}`)
            .send(payload)
            .set('Authorization', authHeader);

        expect(status).toBe(404);
        expect(body.error).toBe('category not found!');
    });

    it('should return unauthorized when no token is provided', async () => {
        const payload = buildCreateTransactionDto({}, category.id);

        const { status } = await request(server)
            .patch(`/bank-accounts/${bankAccount.id}/transactions/${transaction.id}`)
            .send(payload);

        expect(status).toBe(401);
    });
});
