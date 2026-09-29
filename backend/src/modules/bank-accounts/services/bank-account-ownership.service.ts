import { NotFoundError } from '../../../shared/errors';
import { IBankAccountsRepository } from '../interfaces/bank-accounts-repo';

export class BankAccountOwnershipService {
    constructor(private readonly bankAccountRepo: IBankAccountsRepository) {}

    async validate(bankAccountId: number, userId: number) {
        const bankAccount = await this.bankAccountRepo.findFirst(bankAccountId, userId);
        if (!bankAccount) throw new NotFoundError('bank account');
    }
}
