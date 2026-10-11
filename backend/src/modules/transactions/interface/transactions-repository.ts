import { Transaction } from '../../../shared/entities/transaction.entity';
import {
    CreateTransactionDto,
    TransactionListQueryDto,
    TransactionMetricsFilterQueryDto,
    UpdateTransactionDto,
} from '../dto';

export interface TransactionTotals {
    totalIncome: number;
    totalExpense: number;
}

export interface CategoryMonthSummary {
    categoryId: number | null;
    categoryName: string;
    totalAmount: number;
    month: Date;
}

export interface MonthlyIncomeExpense {
    month: Date;
    totalIncome: number;
    totalExpense: number;
}

export interface ITransactionsRepository {
    create(createDto: CreateTransactionDto, bankAccountId: number): Promise<Transaction>;
    findMany(filters: TransactionListQueryDto, bankAccountId: number): Promise<Transaction[]>;
    findFirst(transactionId: number, bankAccountId: number): Promise<Transaction | null>;
    getTotals(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<TransactionTotals>;
    getByCategoryPerMonth(
        filters: TransactionMetricsFilterQueryDto,
        bankAccountId: number,
    ): Promise<CategoryMonthSummary[]>;
    getByType(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<MonthlyIncomeExpense[]>;
    update(updateDto: UpdateTransactionDto, transactionId: number, bankAccountId: number): Promise<Transaction>;
    delete(transactionId: number): Promise<Transaction>;
}
