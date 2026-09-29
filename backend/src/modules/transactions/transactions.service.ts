import { BankAccountOwnershipService } from '../bank-accounts/services/bank-account-ownership.service';
import { CategoryOwnershipService } from '../categories/services/category-ownership.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ITransactionsRepository } from './interface/transactions-repository';

export class TransactionsService {
    constructor(
        private readonly transactionsRepo: ITransactionsRepository,
        private readonly bankAccountOwnershipService: BankAccountOwnershipService,
        private readonly categoryOwnershipService: CategoryOwnershipService,
    ) {}

    async list(bankAccountId: number, userId: number) {
        await this.bankAccountOwnershipService.validate(bankAccountId, userId);
        return this.transactionsRepo.findMany(bankAccountId);
    }

    async create(createDto: CreateTransactionDto, bankAccountId: number, userId: number) {
        const { categoryId } = createDto;

        await this.bankAccountOwnershipService.validate(bankAccountId, userId);
        if (categoryId !== null) await this.categoryOwnershipService.validate(categoryId, userId);

        return this.transactionsRepo.create(createDto, bankAccountId);
    }

    update() {
        return 'Update Transaction';
    }

    delete() {
        return 'Delete Transaction';
    }
}
