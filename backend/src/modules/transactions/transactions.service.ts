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

    async getMetrics(filters: TransactionMetricsFilterQueryDto, bankAccountId: number, userId: number) {
        await this.validateEntitiesOwnership({ userId, bankAccountId });

        const [totalExpense, totalIncome, byCategory] = await Promise.all([
            this.transactionsRepo.getTotalExpense(filters, bankAccountId),
            this.transactionsRepo.getTotalIncome(filters, bankAccountId),
            this.transactionsRepo.getByCategory(filters, bankAccountId),
        ]);

        return {
            balance: totalIncome - totalExpense,
            totalExpense,
            totalIncome,
            byCategory,
        };
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
        const oldTtransaction = await this.validateTransactionOwnership(transactionId, bankAccountId);

        const transaction = await this.transactionsRepo.update(updateDto, transactionId, bankAccountId);
        await this.bankAccountsRepo.incrementBalance(
            bankAccountId,
            transaction.type === 'INCOME'
                ? transaction.amount - oldTtransaction.amount
                : oldTtransaction.amount - transaction.amount,
        );

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
}
