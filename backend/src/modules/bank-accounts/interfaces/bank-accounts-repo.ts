import { BankAccount } from '../../../shared/entities/bank-account.entity';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';

export interface IBankAccountsRepository {
    create(createDto: CreateBankAccountDto, userId: number): Promise<BankAccount>;
    update(updateDto: UpdateBankAccountDto, bankAccountId: number): Promise<BankAccount>;
    findFirst(bankAccountId: number, userId: number): Promise<BankAccount | null>;
    delete(bankAccountId: number): Promise<BankAccount | null>;
}
