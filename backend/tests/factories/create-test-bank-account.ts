import { prisma } from '../../src/shared/database/prisma-client';
import { CreateBankAccountDto } from '../../src/modules/bank-accounts/dto';
import { buildCreateBankAccountDto } from '../builders';

export const createTestBankAccount = async (overrides: Partial<CreateBankAccountDto> = {}, userId: number) => {
    const data = buildCreateBankAccountDto(overrides);

    return await prisma.bankAccount.create({
        data: {
            ...data,
            currentBalance: data.initialBalance,
            userId,
        },
    });
};
