import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { Transaction } from '../../shared/entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ITransactionsRepository } from './interface/transactions-repository';

export class TransactionsRepository implements ITransactionsRepository {
    constructor(private readonly prisma: PrismaClient) {}

    create(createDto: CreateTransactionDto, bankAccountId: number, userId: number): Promise<Transaction> {
        const { name, method, type, createdAt, amount, categoryId } = createDto;

        return this.prisma.transaction.create({
            data: {
                name,
                amount,
                method,
                type,
                createdAt,
                categoryId,
                bankAccountId,
                userId,
            },
        });
    }
    findMany(): Promise<Transaction[]> {
        throw new Error('Method not implemented.');
    }
    update(): Promise<Transaction> {
        throw new Error('Method not implemented.');
    }
    delete(): Promise<Transaction> {
        throw new Error('Method not implemented.');
    }
}
