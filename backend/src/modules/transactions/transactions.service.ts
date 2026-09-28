import { NotFoundError } from '../../shared/errors';
import { IBankAccountsRepository } from '../bank-accounts/interfaces/bank-accounts-repo';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ITransactionsRepository } from './interface/transactions-repository';

export class TransactionsService {
    constructor(
        private readonly transactionsRepo: ITransactionsRepository,
        private readonly bankAccountsRepo: IBankAccountsRepository,
    ) {}

    list() {
        return 'List Transactions';
    }

    create(createDto: CreateTransactionDto, bankAccountId: number, userId: number) {
        const bankAccount = this.bankAccountsRepo.findFirst(bankAccountId, userId);
        if (!bankAccount) throw new NotFoundError('bank account');
        return this.transactionsRepo.create(createDto, bankAccountId, userId);
    }

    update() {
        return 'Update Transaction';
    }

    delete() {
        return 'Delete Transaction';
    }
}
