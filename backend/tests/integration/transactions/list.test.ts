import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { buildTestServer } from '../../helpers';
import { BankAccount, Category, Transaction, User } from '../../../src/shared/entities';
import {
    createAuthenticatedUser,
    createTestBankAccount,
    createTestCategory,
    createTestTransaction,
} from '../../factories';
import { CreateTransactionDto } from '../../../src/modules/transactions/dto';

describe('GET /bank-accounts/:id/transactions', () => {
    const server = buildTestServer();
    let user: User, authHeader: string, bankAccount: BankAccount, category: Category, transaction: Transaction;
    const filterCases: {
        name: string;
        query: string;
        match: Partial<CreateTransactionDto>;
        other: Partial<CreateTransactionDto>;
    }[] = [
        { name: 'type', query: 'type=INCOME', match: { type: 'INCOME' }, other: { type: 'EXPENSE' } },
        { name: 'method', query: 'method=CREDIT', match: { method: 'CREDIT' }, other: { method: 'DEBIT' } },
        { name: 'isFavorite', query: 'isFavorite=true', match: { isFavorite: true }, other: { isFavorite: false } },
        {
            name: 'month',
            query: 'month=1',
            match: { createdAt: new Date(2026, 1, 15).toISOString() },
            other: { createdAt: new Date(2026, 2, 15).toISOString() },
        },
        {
            name: 'year',
            query: 'year=2026',
            match: { createdAt: new Date(2026, new Date().getMonth(), 15).toISOString() },
            other: { createdAt: new Date(2025, new Date().getMonth(), 15).toISOString() },
        },
    ];

    beforeEach(async () => {
        ({ user, authHeader } = await createAuthenticatedUser());
        bankAccount = await createTestBankAccount({}, user.id);
        category = await createTestCategory({}, user.id);
        transaction = await createTestTransaction({}, bankAccount.id, category.id);
    });

    it('should return the bank account transactions successfuly', async () => {
        const { status, body } = await request(server)
            .get(`/bank-accounts/${bankAccount.id}/transactions`)
            .set('Authorization', authHeader);

        expect(status).toBe(200);
        expect(body).toEqual([
            expect.objectContaining({
                id: transaction.id,
                name: transaction.name,
                amount: transaction.amount,
                createdAt: transaction.createdAt.toISOString(),
                isFavorite: transaction.isFavorite,
                type: transaction.type,
                method: transaction.method,
                category: transaction.category,
            }),
        ]);
    });

    it('should return unauthorized when no token is provided', async () => {
        const { status } = await request(server).get(`/bank-accounts/${bankAccount.id}/transactions`);

        expect(status).toBe(401);
    });

    it.each(filterCases)(
        'should return the bank account transactions filtered by %s',
        async ({ query, match, other }) => {
            const includedBankAccount = await createTestBankAccount({}, user.id);
            const includedTransaction = await createTestTransaction(match, includedBankAccount.id);
            await createTestTransaction(other, includedBankAccount.id);

            const { status, body } = await request(server)
                .get(`/bank-accounts/${includedBankAccount.id}/transactions?${query}`)
                .set('Authorization', authHeader);

            expect(status).toBe(200);
            expect(body).toHaveLength(1);
            expect(body[0].id).toBe(includedTransaction.id);
        },
    );

    it('should return only the transactions from the given category', async () => {
        const otherCategory = await createTestCategory({}, user.id);
        await createTestTransaction({}, bankAccount.id, otherCategory.id);

        const { status, body } = await request(server)
            .get(`/bank-accounts/${bankAccount.id}/transactions?category=${category.id}`)
            .set('Authorization', authHeader);

        expect(status).toBe(200);
        expect(body).toHaveLength(1);
        expect(body[0].id).toBe(transaction.id);
    });

    it.todo('should return validation error when %s');

    it.todo('should return empty result');
});
