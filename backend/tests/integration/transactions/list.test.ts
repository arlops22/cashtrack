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

describe('GET /bank-accounts/:id/transactions', () => {
    const server = buildTestServer();
    let user: User, authHeader: string, bankAccount: BankAccount, category: Category, transaction: Transaction;

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

    it.todo('should return the bank account transactions filtered by :?');
});
