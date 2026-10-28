import { Transaction } from '../../../shared/entities/transaction.entity';
import {
    CreateTransactionDto,
    TransactionListQueryDto,
    TransactionMetricsFilterQueryDto,
    UpdateTransactionDto,
} from '../dto';
import { CategoryMonthSummary, MonthlyIncomeExpense, TransactionTotals } from './transaction-metrics.interface';

export interface ITransactionsRepository {
    create(createDto: CreateTransactionDto, bankAccountId: number): Promise<Transaction>;
    findMany(filters: TransactionListQueryDto, bankAccountId: number): Promise<Transaction[]>;
    findFirst(transactionId: number, bankAccountId: number): Promise<Transaction | null>;
    getTotals(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<TransactionTotals>;
    getByCategoryPerMonth(
        filters: TransactionMetricsFilterQueryDto,
        bankAccountId: number,
    ): Promise<CategoryMonthSummary[]>;
    getByType(
        filters: TransactionMetricsFilterQueryDto,
        bankAccountId: number,
    ): Promise<Omit<MonthlyIncomeExpense, 'periodBalance'>[]>;
    update(updateDto: UpdateTransactionDto, transactionId: number, bankAccountId: number): Promise<Transaction>;
    delete(transactionId: number): Promise<Transaction>;
}
