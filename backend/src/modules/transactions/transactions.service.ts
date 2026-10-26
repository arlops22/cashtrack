import {
    CreateTransactionDto,
    TransactionListQueryDto,
    TransactionMetricsFilterQueryDto,
    UpdateTransactionDto,
} from './dto';
import { ITransactionsRepository } from './interface/transactions-repository';
import { IBankAccountsRepository } from '../bank-accounts/interfaces/bank-accounts-repo';
import { CategoryOwnershipService } from '../categories/services/category-ownership.service';
import { BankAccountOwnershipService } from '../bank-accounts/services/bank-account-ownership.service';
import { NotFoundError } from '../../shared/errors';
import { TransactionType } from './enum/transaction-type';

export class TransactionsService {
    constructor(
        private readonly transactionsRepo: ITransactionsRepository,
        private readonly bankAccountsRepo: IBankAccountsRepository,
        private readonly bankAccountOwnershipService: BankAccountOwnershipService,
        private readonly categoryOwnershipService: CategoryOwnershipService,
    ) {}

    async list(filters: TransactionListQueryDto, bankAccountId: number, userId: number) {
        await this.validateEntitiesOwnership({ userId, bankAccountId });

        return this.transactionsRepo.findMany(filters, bankAccountId);
    }

    async create(createDto: CreateTransactionDto, bankAccountId: number, userId: number) {
        const { categoryId } = createDto;

        await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

        const transaction = await this.transactionsRepo.create(createDto, bankAccountId);
        await this.bankAccountsRepo.incrementBalance(
            bankAccountId,
            transaction.type === 'INCOME' ? transaction.amount : -transaction.amount,
        );

        return transaction;
    }

    async update(updateDto: UpdateTransactionDto, transactionId: number, bankAccountId: number, userId: number) {
        const { categoryId } = updateDto;

        await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });
        const oldTransaction = await this.validateTransactionOwnership(transactionId, bankAccountId);

        const transaction = await this.transactionsRepo.update(updateDto, transactionId, bankAccountId);
        const balanceDelta =
            this.signedAmount(transaction.type, transaction.amount) -
            this.signedAmount(oldTransaction.type, oldTransaction.amount);

        if (balanceDelta !== 0) {
            await this.bankAccountsRepo.incrementBalance(bankAccountId, balanceDelta);
        }

        return transaction;
    }

    async delete(transactionId: number, bankAccountId: number, userId: number) {
        await this.validateEntitiesOwnership({ transactionId, userId, bankAccountId });

        const transaction = await this.transactionsRepo.delete(transactionId);
        await this.bankAccountsRepo.decrementBalance(
            bankAccountId,
            transaction.type === 'INCOME' ? transaction.amount : -transaction.amount,
        );

        return transaction;
    }

    async getMetrics(filters: TransactionMetricsFilterQueryDto, bankAccountId: number, userId: number) {
        await this.validateEntitiesOwnership({ userId, bankAccountId });

        const [totals, categorySummary, monthlyTotals] = await Promise.all([
            this.transactionsRepo.getTotals(filters, bankAccountId),
            this.transactionsRepo.getByCategoryPerMonth(filters, bankAccountId),
            this.transactionsRepo.getByType(filters, bankAccountId),
        ]);

        return {
            summary: {
                ...totals,
                periodBalance: totals.totalIncome - totals.totalExpense,
            },
            categorySummary,
            monthlyTotals: monthlyTotals.map(row => ({
                ...row,
                periodBalance: row.totalIncome - row.totalExpense,
            })),
        };
    }

    private async validateTransactionOwnership(transactionId: number, bankAccountId: number) {
        const transaction = await this.transactionsRepo.findFirst(transactionId, bankAccountId);
        if (!transaction) throw new NotFoundError('transaction');
        return transaction;
    }

    private async validateEntitiesOwnership({
        transactionId,
        bankAccountId,
        categoryId,
        userId,
    }: {
        transactionId?: number;
        bankAccountId: number;
        userId: number;
        categoryId?: number | null;
    }) {
        await Promise.all([
            this.bankAccountOwnershipService.validate(bankAccountId, userId),
            categoryId && this.categoryOwnershipService.validate(categoryId, userId),
            transactionId && this.validateTransactionOwnership(transactionId, bankAccountId),
        ]);
    }

    private signedAmount(type: TransactionType, amount: number) {
        return type === 'INCOME' ? amount : -amount;
    }
}
