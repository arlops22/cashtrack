import z from 'zod';

import { CreateBankAccountDto, createBankAccountDtoSchema } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto, updateBankAccountDtoSchema } from './dto/update-bank-account.dto';

import { ValidationError } from '../../shared/errors';

export class BankAccountsService {
    create(createDto: CreateBankAccountDto) {
        const {} = createDto;

        const validation = createBankAccountDtoSchema.safeParse(createDto);
        if (!validation.success) {
            throw new ValidationError('Invalid fields', z.flattenError(validation.error).fieldErrors);
        }

        return 'Bank Account created';
    }

    update(updateDto: UpdateBankAccountDto) {
        const {} = updateDto;

        const validation = updateBankAccountDtoSchema.safeParse(updateDto);
        if (!validation.success) {
            throw new ValidationError('Invalid fields', z.flattenError(validation.error).fieldErrors);
        }
        return 'Bank Account updated';
    }

    delete() {
        return 'Bank Account deleted';
    }
}
