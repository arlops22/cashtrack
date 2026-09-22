import z from 'zod';

import { CreateBankAccountDto, createBankAccountDtoSchema } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto, updateBankAccountDtoSchema } from './dto/update-bank-account.dto';

import { ValidationError } from '../../shared/errors';
import { IBankAccountsRepository } from './interfaces/bank-accounts-repo';

export class BankAccountsService {
    constructor(private readonly bankAccountRepo: IBankAccountsRepository) {}

    create(createDto: CreateBankAccountDto, userId: number) {
        const validation = createBankAccountDtoSchema.safeParse(createDto);
        if (!validation.success) {
            throw new ValidationError('Invalid fields', z.flattenError(validation.error).fieldErrors);
        }

        return this.bankAccountRepo.create(createDto, userId);
    }

    update(updateDto: UpdateBankAccountDto, userId: number) {
        const {} = updateDto;

        const validation = updateBankAccountDtoSchema.safeParse(updateDto);
        if (!validation.success) {
            throw new ValidationError('Invalid fields', z.flattenError(validation.error).fieldErrors);
        }
        return 'Bank Account updated';
    }

    delete(userId: number) {
        return 'Bank Account deleted';
    }
}
