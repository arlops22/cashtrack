import { Transaction } from '../../../shared/entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

export interface ITransactionsRepository {
    create(createDto: CreateTransactionDto, bankAccountId: number, userId: number): Promise<Transaction>;
    findMany(): Promise<Transaction[]>;
    update(): Promise<Transaction>;
    delete(): Promise<Transaction>;
}
