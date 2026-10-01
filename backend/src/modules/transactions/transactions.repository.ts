import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { Transaction } from '../../shared/entities/transaction.entity';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { ITransactionsRepository } from './interface/transactions-repository';

export class TransactionsRepository implements ITransactionsRepository {
    constructor(private readonly prisma: PrismaClient) {}

    create(createDto: CreateTransactionDto, bankAccountId: number): Promise<Transaction> {
        const { name, method, type, createdAt, amount, categoryId, isFavorite } = createDto;

        return this.prisma.transaction.create({
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
    }

    findMany(bankAccountId: number): Promise<Transaction[]> {
        return this.prisma.transaction.findMany({
            where: { bankAccountId },
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

    update(updateDto: UpdateTransactionDto, transactionId: number, bankAccountId: number): Promise<Transaction> {
        const { name, method, type, createdAt, amount, categoryId, isFavorite } = updateDto;

        return this.prisma.transaction.update({
            where: { id: transactionId },
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
    }

    delete(transactionId: number): Promise<Transaction> {
        return this.prisma.transaction.delete({
            where: { id: transactionId },
        });
    }
}
