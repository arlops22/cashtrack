import { prisma } from '../../src/shared/database/prisma-client';
import { CreateTransactionDto } from '../../src/modules/transactions/dto';
import { buildCreateTransactionDto } from '../builders';

export const createTestTransaction = async (
    overrides: Partial<CreateTransactionDto> = {},
    bankAccountId: number,
    categoryId: number,
) => {
    const data = buildCreateTransactionDto(overrides, categoryId);

    return await prisma.transaction.create({
        data: {
            ...data,
            bankAccountId,
        },
        select: {
            id: true,
            name: true,
            amount: true,
            createdAt: true,
            isFavorite: true,
            type: true,
            method: true,
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};
