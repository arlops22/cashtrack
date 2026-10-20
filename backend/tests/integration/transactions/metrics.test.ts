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

describe('GET /bank-accounts/:id/transactions/metrics', () => {
    const server = buildTestServer();
    let user: User, authHeader: string, bankAccount: BankAccount, category: Category, transaction: Transaction;

    beforeEach(async () => {
        ({ user, authHeader } = await createAuthenticatedUser());
        bankAccount = await createTestBankAccount({}, user.id);
        category = await createTestCategory({}, user.id);
        transaction = await createTestTransaction({}, bankAccount.id, category.id);
    });

    it('should return the transactions metrics successfuly', async () => {
        const { status, body } = await request(server)
            .get(`/bank-accounts/${bankAccount.id}/transactions/metrics`)
            .set('Authorization', authHeader);

        expect(status).toBe(200);
        expect(body).toMatchObject({
            summary: expect.objectContaining({
                totalIncome: expect.any(Number),
                totalExpense: expect.any(Number),
                balance: expect.any(Number),
            }),
            categorySummary: expect.arrayContaining([
                expect.objectContaining({
                    month: expect.any(String),
                    categories: [
                        expect.objectContaining({
                            categoryId: expect.any(Number),
                            categoryName: expect.any(String),
                            totalAmount: expect.any(Number),
                        }),
                    ],
                }),
            ]),
            monthlyTotals: expect.arrayContaining([
                expect.objectContaining({
                    month: expect.any(String),
                    summary: expect.objectContaining({
                        totalIncome: expect.any(Number),
                        totalExpense: expect.any(Number),
                    }),
                }),
            ]),
        });
    });

    it.todo('should return metrics with filters successfuly');

    it('should return unauthorized when no token is provided', async () => {
        const { status } = await request(server).get(`/bank-accounts/${bankAccount.id}/transactions/metrics`);

        expect(status).toBe(401);
    });
});
