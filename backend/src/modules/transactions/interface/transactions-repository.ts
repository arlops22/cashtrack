import { Transaction } from '../../../shared/entities/transaction.entity';
import { CreateTransactionDto, UpdateTransactionDto } from '../dto';

export interface ITransactionsRepository {
    create(createDto: CreateTransactionDto, bankAccountId: number): Promise<Transaction>;
    findMany(bankAccountId: number): Promise<Transaction[]>;
    findFirst(transactionId: number, bankAccountId: number): Promise<Transaction | null>;
    update(updateDto: UpdateTransactionDto, transactionId: number, bankAccountId: number): Promise<Transaction>;
    delete(transactionId: number): Promise<Transaction>;
}
