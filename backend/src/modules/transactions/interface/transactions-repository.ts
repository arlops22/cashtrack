import { Transaction } from '../../../shared/entities/transaction.entity';
import {
    CreateTransactionDto,
    TransactionListQueryDto,
    TransactionMetricsFilterQueryDto,
    UpdateTransactionDto,
} from '../dto';

export interface ITransactionsRepository {
    create(createDto: CreateTransactionDto, bankAccountId: number): Promise<Transaction>;
    findMany(filters: TransactionListQueryDto, bankAccountId: number): Promise<Transaction[]>;
    findFirst(transactionId: number, bankAccountId: number): Promise<Transaction | null>;
    getTotalExpense(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<number>;
    getTotalIncome(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<number>;
    update(updateDto: UpdateTransactionDto, transactionId: number, bankAccountId: number): Promise<Transaction>;
    delete(transactionId: number): Promise<Transaction>;
}
