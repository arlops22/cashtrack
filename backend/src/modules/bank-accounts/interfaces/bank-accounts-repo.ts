import { BankAccount } from '../../../shared/entities/bank-account.entity';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';

export interface IBankAccountsRepository {
    create(createDto: CreateBankAccountDto, userId: number): Promise<BankAccount>;
}
