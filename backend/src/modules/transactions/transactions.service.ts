import { CreateTransactionDto, TransactionListQueryDto, UpdateTransactionDto } from './dto';
import { ITransactionsRepository } from './interface/transactions-repository';
import { CategoryOwnershipService } from '../categories/services/category-ownership.service';
import { BankAccountOwnershipService } from '../bank-accounts/services/bank-account-ownership.service';
import { NotFoundError } from '../../shared/errors';

export class TransactionsService {
    constructor(
        private readonly transactionsRepo: ITransactionsRepository,
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

        return this.transactionsRepo.create(createDto, bankAccountId);
    }

    async update(updateDto: UpdateTransactionDto, transactionId: number, bankAccountId: number, userId: number) {
        const { categoryId } = updateDto;

        await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });
        const transaction = await this.validateTransactionOwnership(transactionId, bankAccountId);

        return this.transactionsRepo.update(updateDto, transaction, bankAccountId);
    }

    async delete(transactionId: number, bankAccountId: number, userId: number) {
        await this.validateEntitiesOwnership({ transactionId, userId, bankAccountId });

        return this.transactionsRepo.delete(transactionId);
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
