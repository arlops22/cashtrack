import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { buildTestServer } from '../../helpers';
import { BankAccount, Category, Transaction, User } from '../../../src/shared/entities';
import {
    createAuthenticatedUser,
    createTestBankAccount,
    createTestCategory,
    createTestTransaction,
    createTestUser,
} from '../../factories';
import { buildCreateTransactionDto } from '../../builders';
import { TransactionType } from '../../../src/modules/transactions/enum/transaction-type';
import { prisma } from '../../../src/shared/database/prisma-client';

describe('DELETE /bank-accounts/:id/transactions/:id', () => {
    const server = buildTestServer();
    let user: User, authHeader: string, bankAccount: BankAccount, category: Category, transaction: Transaction;

    beforeEach(async () => {
        ({ user, authHeader } = await createAuthenticatedUser());
        bankAccount = await createTestBankAccount({}, user.id);
        category = await createTestCategory({}, user.id);
        transaction = await createTestTransaction({}, bankAccount.id, category.id);
    });

    it('should delete a transaction and return 204', async () => {
        const { status, body } = await request(server)
            .delete(`/bank-accounts/${bankAccount.id}/transactions/${transaction.id}`)
            .set('Authorization', authHeader);

        expect(status).toBe(204);
        expect(body).toEqual({});
    });

    it.each([
        { type: 'EXPENSE', accountBalance: 900, expectedBalance: 1000 },
        { type: 'INCOME', accountBalance: 1100, expectedBalance: 1000 },
    ] as { type: TransactionType; accountBalance: number; expectedBalance: number }[])(
        'should update the balance when a $type transaction is deleted',
        async ({ type, accountBalance, expectedBalance }) => {
            const bankAccount = await createTestBankAccount({ initialBalance: accountBalance }, user.id);
            const transaction = await createTestTransaction({ type, amount: 100 }, bankAccount.id, category.id);

            const { status } = await request(server)
                .delete(`/bank-accounts/${bankAccount.id}/transactions/${transaction.id}`)
                .set('Authorization', authHeader);
            const updatedAccount = await prisma.bankAccount.findUniqueOrThrow({ where: { id: bankAccount.id } });

            expect(status).toBe(204);
            expect(updatedAccount.currentBalance).toBe(expectedBalance);
        },
    );

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
