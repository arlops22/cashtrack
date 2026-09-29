import { Transaction } from '../../../shared/entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

export interface ITransactionsRepository {
    create(createDto: CreateTransactionDto, bankAccountId: number): Promise<Transaction>;
    findMany(bankAccountId: number): Promise<Transaction[]>;
    update(): Promise<Transaction>;
    delete(): Promise<Transaction>;
}
