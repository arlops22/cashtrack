import { Transaction } from '../../../shared/entities/transaction.entity';
import { CreateTransactionDto, TransactionListQueryDto, UpdateTransactionDto } from '../dto';

export interface ITransactionsRepository {
    create(createDto: CreateTransactionDto, bankAccountId: number): Promise<Transaction>;
    findMany(filters: TransactionListQueryDto, bankAccountId: number): Promise<Transaction[]>;
    findFirst(transactionId: number, bankAccountId: number): Promise<Transaction | null>;
    update(updateDto: UpdateTransactionDto, oldTransaction: Transaction, bankAccountId: number): Promise<Transaction>;
    delete(transactionId: number): Promise<Transaction>;
}
