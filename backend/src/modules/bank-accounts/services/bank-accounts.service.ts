import { CreateBankAccountDto, UpdateBankAccountDto } from '../dto';
import { IBankAccountsRepository } from '../interfaces/bank-accounts-repo';
import { BankAccountOwnershipService } from './bank-account-ownership.service';

export class BankAccountsService {
    constructor(
        private readonly bankAccountRepo: IBankAccountsRepository,
        private readonly bankAccountOwnershipService: BankAccountOwnershipService,
    ) {}

    create(createDto: CreateBankAccountDto, userId: number) {
        return this.bankAccountRepo.create(createDto, userId);
    }

    async update(updateDto: UpdateBankAccountDto, bankAccountId: number, userId: number) {
        await this.bankAccountOwnershipService.validate(bankAccountId, userId);

        return this.bankAccountRepo.update(updateDto, bankAccountId);
    }

    async delete(bankAccountId: number, userId: number) {
        await this.bankAccountOwnershipService.validate(bankAccountId, userId);
        return this.bankAccountRepo.delete(bankAccountId);
    }
}
