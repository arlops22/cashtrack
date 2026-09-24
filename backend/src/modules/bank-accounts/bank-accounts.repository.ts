import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { BankAccount } from '../../shared/entities/bank-account.entity';
import { CreateBankAccountDto, UpdateBankAccountDto } from './dto';
import { IBankAccountsRepository } from './interfaces/bank-accounts-repo';

export class BankAccountsRepository implements IBankAccountsRepository {
    constructor(private readonly prisma: PrismaClient) {}

    create(createDto: CreateBankAccountDto, userId: number): Promise<BankAccount> {
        const { name, initialBalance, color, type } = createDto;

        return this.prisma.bankAccount.create({
            data: {
                userId,
                name,
                initialBalance,
                currentBalance: initialBalance,
                color,
                type,
            },
        });
    }

    update(updateDto: UpdateBankAccountDto, bankAccountId: number): Promise<BankAccount> {
        const { name, initialBalance, color, type } = updateDto;

        return this.prisma.bankAccount.update({
            where: { id: bankAccountId },
            data: {
                name,
                initialBalance,
                color,
                type,
            },
        });
    }

    findFirst(bankAccountId: number, userId: number): Promise<BankAccount | null> {
        return this.prisma.bankAccount.findFirst({
            where: { id: bankAccountId, userId },
        });
    }

    delete(bankAccountId: number): Promise<BankAccount | null> {
        return this.prisma.bankAccount.delete({
            where: { id: bankAccountId },
        });
    }
}
