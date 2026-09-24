import { CreateBankAccountDto, UpdateBankAccountDto } from './dto';
import { IBankAccountsRepository } from './interfaces/bank-accounts-repo';
import { NotFoundError } from '../../shared/errors';

export class BankAccountsService {
    constructor(private readonly bankAccountRepo: IBankAccountsRepository) {}

    create(createDto: CreateBankAccountDto, userId: number) {
        return this.bankAccountRepo.create(createDto, userId);
    }

    async update(updateDto: UpdateBankAccountDto, bankAccountId: number, userId: number) {
        await this.validateOwnership(bankAccountId, userId);

        return this.bankAccountRepo.update(updateDto, bankAccountId);
    }

    async delete(bankAccountId: number, userId: number) {
        await this.validateOwnership(bankAccountId, userId);
        return this.bankAccountRepo.delete(bankAccountId);
    }

    private async validateOwnership(bankAccountId: number, userId: number) {
        const bankAccount = await this.bankAccountRepo.findFirst(bankAccountId, userId);
        if (!bankAccount) throw new NotFoundError('bank account');
    }
}
