import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { prisma } from '../../src/shared/database/prisma-client';
import { buildTestServer } from '../helpers';
import { BankAccount, Category, Transaction, User } from '../../src/shared/entities';
import {
    createAuthenticatedUser,
    createTestBankAccount,
    createTestCategory,
    createTestTransaction,
    createTestUser,
} from '../factories';
import { buildCreateTransactionDto } from '../builders';

describe('Transactions Module', () => {
    const server = buildTestServer();
    let user: User, authHeader: string, bankAccount: BankAccount, category: Category, transaction: Transaction;

    beforeEach(async () => {
        ({ user, authHeader } = await createAuthenticatedUser());
        bankAccount = await createTestBankAccount({}, user.id);
        category = await createTestCategory({}, user.id);
        transaction = await createTestTransaction({}, bankAccount.id, category.id);
    });

    describe('GET /bank-accounts/:id/transactions', () => {
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

        it.todo('should return the bank account transactions filtered by :?');
    });

    describe('POST /bank-accounts/:id/transactions', () => {
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

            const { status } = await request(server)
                .post(`/bank-accounts/${bankAccount.id}/transactions`)
                .send(payload);

            expect(status).toBe(401);
        });

        it.todo('should update bank account current balance successfuly', async () => {});
    });

    describe('PATCH /bank-accounts/:id/transactions/:id', () => {
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

    describe('DELETE /bank-accounts/:id/transactions/:id', () => {
        it('should delete a transaction and return 204', async () => {
            const { status, body } = await request(server)
                .delete(`/bank-accounts/${bankAccount.id}/transactions/${transaction.id}`)
                .set('Authorization', authHeader);

            expect(status).toBe(204);
            expect(body).toEqual({});
        });

        it.todo('should update bank account current balance without error', async () => {});

        it('should return not found error when the user is not the owner of the provided bank account', async () => {
            const { user: ownerUser } = await createTestUser({ email: 'owner@email.com' });
            const ownerBankAccount = await createTestBankAccount({}, ownerUser.id);

            const { status, body } = await request(server)
                .delete(`/bank-accounts/${ownerBankAccount.id}/transactions/${transaction.id}`)
                .set('Authorization', authHeader);

            expect(status).toBe(404);
            expect(body.error).toBe('bank account not found!');
        });

        it('should return not found error when the bank account is not the owner of the provided transaction', async () => {
            const ownerBankAccount = await createTestBankAccount({}, user.id);
            const ownerTransaction = await createTestTransaction({}, ownerBankAccount.id, category.id);

            const { status, body } = await request(server)
                .delete(`/bank-accounts/${bankAccount.id}/transactions/${ownerTransaction.id}`)
                .set('Authorization', authHeader);

            expect(status).toBe(404);
            expect(body.error).toBe('transaction not found!');
        });

        it('should return unauthorized when no token is provided', async () => {
            const payload = buildCreateTransactionDto({}, category.id);

            const { status } = await request(server)
                .delete(`/bank-accounts/${bankAccount.id}/transactions/${transaction.id}`)
                .send(payload);

            expect(status).toBe(401);
        });
    });

    describe('GET /bank-accounts/:id/transactions/metrics', () => {
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
});
