import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { Transaction } from '../../shared/entities/transaction.entity';
import { CreateTransactionDto, TransactionListQueryDto, UpdateTransactionDto } from './dto';
import { ITransactionsRepository } from './interface/transactions-repository';

export class TransactionsRepository implements ITransactionsRepository {
    constructor(private readonly prisma: PrismaClient) {}

    create(createDto: CreateTransactionDto, bankAccountId: number): Promise<Transaction> {
        const { name, method, type, createdAt, amount, categoryId, isFavorite } = createDto;

        return this.prisma.$transaction(async tx => {
            const transaction = await tx.transaction.create({
                data: {
                    name,
                    amount,
                    method,
                    type,
                    createdAt,
                    isFavorite,
                    categoryId,
                    bankAccountId,
                },
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    createdAt: true,
                    isFavorite: true,
                    type: true,
                    method: true,
                },
            });

            await tx.bankAccount.update({
                where: { id: bankAccountId },
                data: {
                    currentBalance: {
                        increment: type === 'INCOME' ? amount : -amount,
                    },
                },
            });

            return transaction;
        });
    }

    findMany(filters: TransactionListQueryDto, bankAccountId: number): Promise<Transaction[]> {
        const { type, method, category, isFavorite, month, year } = filters;

        const today = new Date();
        const yearFilter = year ?? today.getFullYear();
        const monthFilter = month ?? today.getMonth();

        return this.prisma.transaction.findMany({
            where: {
                bankAccountId,
                type,
                method,
                categoryId: category,
                isFavorite,
                createdAt: {
                    gte: new Date(Date.UTC(yearFilter, monthFilter)),
                    lt: new Date(Date.UTC(yearFilter, monthFilter + 1)),
                },
            },
            select: {
                id: true,
                name: true,
                amount: true,
                createdAt: true,
                isFavorite: true,
                type: true,
                method: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    findFirst(transactionId: number, bankAccountId: number): Promise<Transaction | null> {
        return this.prisma.transaction.findFirst({
            where: { id: transactionId, bankAccountId },
        });
    }

    update(updateDto: UpdateTransactionDto, oldTransaction: Transaction, bankAccountId: number): Promise<Transaction> {
        const { name, method, type, createdAt, amount, categoryId, isFavorite } = updateDto;

        return this.prisma.$transaction(async tx => {
            const transaction = await tx.transaction.update({
                where: { id: oldTransaction.id },
                data: {
                    name,
                    method,
                    type,
                    createdAt,
                    isFavorite,
                    amount,
                    categoryId,
                    bankAccountId,
                },
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    createdAt: true,
                    isFavorite: true,
                    type: true,
                    method: true,
                },
            });

            await tx.bankAccount.update({
                where: { id: bankAccountId },
                data: {
                    currentBalance: {
                        increment: type === 'INCOME' ? amount - oldTransaction.amount : oldTransaction.amount - amount,
                    },
                },
            });

            return transaction;
        });
    }

    delete(transactionId: number): Promise<Transaction> {
        return this.prisma.$transaction(async tx => {
            const transaction = await tx.transaction.delete({
                where: { id: transactionId },
            });

            await tx.bankAccount.update({
                where: { id: transaction.bankAccountId },
                data: {
                    currentBalance: {
                        decrement: transaction.type === 'INCOME' ? transaction.amount : -transaction.amount,
                    },
                },
            });

            return transaction;
        });
    }
}
