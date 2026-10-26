import { CreateTransactionDto } from '../../src/modules/transactions/dto';

export const buildCreateTransactionDto = (
    overrides: Partial<CreateTransactionDto> = {},
    categoryId?: number,
): CreateTransactionDto => ({
    name: 'Test Transaction',
    amount: 1000,
    method: 'CREDIT',
    type: 'EXPENSE',
    createdAt: new Date().toISOString(),
    isFavorite: false,
    categoryId: categoryId || null,
    ...overrides,
});
