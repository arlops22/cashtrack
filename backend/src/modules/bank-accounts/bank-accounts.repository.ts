import { BankAccount as PrismaBankAccount, PrismaClient } from '../../../prisma/generated/prisma/client';

import { BankAccount } from '../../shared/entities/bank-account.entity';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { IBankAccountsRepository } from './interfaces/bank-accounts-repo';

export class BankAccountsRepository implements IBankAccountsRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(createDto: CreateBankAccountDto, userId: number): Promise<BankAccount> {
        const { name, initialBalance, color, type } = createDto;

        const data = await this.prisma.bankAccount.create({
            data: {
                userId,
                name,
                initialBalance,
                currentBalance: initialBalance,
                color,
                type,
            },
        });
        return this.toBankAccountEntity(data);
    }

    private toBankAccountEntity(raw: PrismaBankAccount): BankAccount {
        return {
            ...raw,
            initialBalance: raw.initialBalance.toNumber(),
            currentBalance: raw.currentBalance.toNumber(),
        } as BankAccount;
    }
}
