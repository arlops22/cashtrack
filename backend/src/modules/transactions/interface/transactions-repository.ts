import { Transaction } from '../../../shared/entities/transaction.entity';
import {
    CreateTransactionDto,
    TransactionListQueryDto,
    TransactionMetricsFilterQueryDto,
    UpdateTransactionDto,
} from '../dto';

export interface getByCategorySummary {
    categoryId: number | null;
    categoryName: string;
    totalAmount: number;
    month: Date;
}

export interface getByTypeSummary {
    totalIncome: number;
    totalExpense: number;
    month: Date;
    balance: number;
}

export interface ITransactionsRepository {
    create(createDto: CreateTransactionDto, bankAccountId: number): Promise<Transaction>;
    findMany(filters: TransactionListQueryDto, bankAccountId: number): Promise<Transaction[]>;
    findFirst(transactionId: number, bankAccountId: number): Promise<Transaction | null>;
    getTotalExpense(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<number>;
    getTotalIncome(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<number>;
    getByCategory(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<getByCategorySummary[]>;
    getByType(filters: TransactionMetricsFilterQueryDto, bankAccountId: number): Promise<getByTypeSummary[]>;
    update(updateDto: UpdateTransactionDto, transactionId: number, bankAccountId: number): Promise<Transaction>;
    delete(transactionId: number): Promise<Transaction>;
}
