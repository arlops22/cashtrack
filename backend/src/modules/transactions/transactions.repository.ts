import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { Transaction } from '../../shared/entities/transaction.entity';
import {
    CreateTransactionDto,
    TransactionListQueryDto,
    TransactionMetricsFilterQueryDto,
    UpdateTransactionDto,
} from './dto';
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

    async getTotalExpense(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<number> {
        const { from, to } = filters;

        const now = new Date();

        const result = await this.prisma.transaction.aggregate({
            where: {
                bankAccountId,
                type: 'EXPENSE',
                createdAt: {
                    gte: this.parseDateUTC(from || `${now.getFullYear()}-01-01`),
                    lt: this.parseDateUTC(to || `${now.getFullYear() + 1}-01-01`),
                },
            },
            _sum: { amount: true },
        });

        return result._sum.amount ?? 0;
    }

    async getTotalIncome(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<number> {
        const { from, to } = filters;

        const now = new Date();

        const result = await this.prisma.transaction.aggregate({
            where: {
                bankAccountId,
                type: 'INCOME',
                createdAt: {
                    gte: this.parseDateUTC(from || `${now.getFullYear()}-01-01`),
                    lt: this.parseDateUTC(to || `${now.getFullYear() + 1}-01-01`),
                },
            },
            _sum: { amount: true },
        });

        return result._sum.amount ?? 0;
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

    private parseDateUTC(dateString: string): Date {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    }
}
