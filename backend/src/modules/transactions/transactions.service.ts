import { NotFoundError } from '../../shared/errors';
import { BankAccountOwnershipService } from '../bank-accounts/services/bank-account-ownership.service';
import { CategoryOwnershipService } from '../categories/services/category-ownership.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { ITransactionsRepository } from './interface/transactions-repository';

export class TransactionsService {
    constructor(
        private readonly transactionsRepo: ITransactionsRepository,
        private readonly bankAccountOwnershipService: BankAccountOwnershipService,
        private readonly categoryOwnershipService: CategoryOwnershipService,
    ) {}

    async list(bankAccountId: number, userId: number) {
        await this.validateEntitiesOwnership({ userId, bankAccountId });
        return this.transactionsRepo.findMany(bankAccountId);
    }

    async create(createDto: CreateTransactionDto, bankAccountId: number, userId: number) {
        const { categoryId } = createDto;

        await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

        return this.transactionsRepo.create(createDto, bankAccountId);
    }

    async update(updateDto: UpdateTransactionDto, transactionId: number, bankAccountId: number, userId: number) {
        const { categoryId } = updateDto;

        await this.validateEntitiesOwnership({ transactionId, userId, bankAccountId, categoryId });

        return this.transactionsRepo.update(updateDto, transactionId, bankAccountId);
    }

    async delete(transactionId: number, bankAccountId: number, userId: number) {
        await this.validateEntitiesOwnership({ transactionId, userId, bankAccountId });

        return this.transactionsRepo.delete(transactionId);
    }

    private async validateTransactionOwnership(transactionId: number, bankAccountId: number) {
        const category = await this.transactionsRepo.findFirst(transactionId, bankAccountId);
        if (!category) throw new NotFoundError('transaction');
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
