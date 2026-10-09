import { Transaction } from '../../../shared/entities/transaction.entity';
import {
    CreateTransactionDto,
    TransactionListQueryDto,
    TransactionMetricsFilterQueryDto,
    UpdateTransactionDto,
} from '../dto';

export interface getTotals {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export interface getByCategorySummary {
    categoryId: number | null;
    categoryName: string;
    totalAmount: number;
    month: Date;
}

export interface getMonthlyTotals extends getTotals {
    month: Date;
}

export interface ITransactionsRepository {
    create(createDto: CreateTransactionDto, bankAccountId: number): Promise<Transaction>;
    findMany(filters: TransactionListQueryDto, bankAccountId: number): Promise<Transaction[]>;
    findFirst(transactionId: number, bankAccountId: number): Promise<Transaction | null>;
    getTotals(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<getTotals>;
    getByCategory(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<getByCategorySummary[]>;
    getByType(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<getMonthlyTotals[]>;
    update(updateDto: UpdateTransactionDto, transactionId: number, bankAccountId: number): Promise<Transaction>;
    delete(transactionId: number): Promise<Transaction>;
}
