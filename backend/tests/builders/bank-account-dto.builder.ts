import { CreateBankAccountDto } from '../../src/modules/bank-accounts/dto';

export const buildCreateBankAccountDto = (overrides: Partial<CreateBankAccountDto> = {}): CreateBankAccountDto => ({
    name: 'Test Account',
    initialBalance: 1000,
    color: '000',
    type: 'CHECKING',
    ...overrides,
});
