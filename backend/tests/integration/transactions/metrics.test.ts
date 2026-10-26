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

    it('should return total values without errors', async () => {
        const bankAccount = await createTestBankAccount({ initialBalance: 1000 }, user.id);
        const category1 = await createTestCategory({}, user.id);
        const category2 = await createTestCategory({}, user.id);
        const category3 = await createTestCategory({}, user.id);
        const transaction1 = await createTestTransaction(
            { type: 'EXPENSE', amount: 100 },
            bankAccount.id,
            category1.id,
        );
        const transaction2 = await createTestTransaction(
            { type: 'EXPENSE', amount: 250 },
            bankAccount.id,
            category2.id,
        );
        await createTestTransaction({ type: 'INCOME', amount: 1000 }, bankAccount.id, category3.id);

        const { status, body } = await request(server)
            .get(`/bank-accounts/${bankAccount.id}/transactions/metrics`)
            .set('Authorization', authHeader);

        expect(status).toBe(200);
        expect(body.summary.totalIncome).toBe(1000);
        expect(body.summary.totalExpense).toBe(350);
        expect(body.summary.periodBalance).toBe(650);
        expect(
            body.categorySummary[0].categories.find(category => category.categoryId === category1.id).totalAmount,
        ).toBe(100);
        expect(
            body.categorySummary[0].categories.find(category => category.categoryId === category2.id).totalAmount,
        ).toBe(250);
        expect(body.monthlyTotals[0].summary.totalIncome).toBe(1000);
        expect(body.monthlyTotals[0].summary.totalExpense).toBe(350);
        expect(body.monthlyTotals[0].summary.periodBalance).toBe(350);
    });

    it('should return unauthorized when no token is provided', async () => {
        const { status } = await request(server).get(`/bank-accounts/${bankAccount.id}/transactions/metrics`);

        expect(status).toBe(401);
    });
});
