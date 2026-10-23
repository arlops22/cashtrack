import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { prisma } from '../../../src/shared/database/prisma-client';
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
import { TransactionType } from '../../../src/modules/transactions/enum/transaction-type';

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

    it.each([
        { type: 'EXPENSE', accountBalance: 900, expectedBalance: 800 },
        { type: 'INCOME', accountBalance: 1100, expectedBalance: 1200 },
    ] as { type: TransactionType; accountBalance: number; expectedBalance: number }[])(
        'should update the balance when a $type transaction is updated',
        async ({ type, accountBalance, expectedBalance }) => {
            const bankAccount = await createTestBankAccount({ initialBalance: accountBalance }, user.id);
            const transaction = await createTestTransaction({ type, amount: 100 }, bankAccount.id, category.id);

            const { status } = await request(server)
                .patch(`/bank-accounts/${bankAccount.id}/transactions/${transaction.id}`)
                .send({ amount: 200 })
                .set('Authorization', authHeader);
            const updatedAccount = await prisma.bankAccount.findUniqueOrThrow({ where: { id: bankAccount.id } });

            expect(status).toBe(200);
            expect(updatedAccount.currentBalance).toBe(expectedBalance);
        },
    );

    it.each([
        { from: 'EXPENSE', to: 'INCOME', accountBalance: 900, expectedBalance: 1100 },
        { from: 'INCOME', to: 'EXPENSE', accountBalance: 1100, expectedBalance: 900 },
    ] as { from: TransactionType; to: TransactionType; accountBalance: number; expectedBalance: number }[])(
        'should recalculate the balance when the type changes from $from to $to',
        async ({ from, to, accountBalance, expectedBalance }) => {
            const bankAccount = await createTestBankAccount({ initialBalance: accountBalance }, user.id);
            const transaction = await createTestTransaction({ type: from, amount: 100 }, bankAccount.id, category.id);

            const { status } = await request(server)
                .patch(`/bank-accounts/${bankAccount.id}/transactions/${transaction.id}`)
                .send({ type: to })
                .set('Authorization', authHeader);
            const updatedAccount = await prisma.bankAccount.findUniqueOrThrow({ where: { id: bankAccount.id } });

            expect(status).toBe(200);
            expect(updatedAccount.currentBalance).toBe(expectedBalance);
        },
    );

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
