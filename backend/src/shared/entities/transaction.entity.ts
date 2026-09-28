import { TransactionType } from '../../modules/transactions/enum/transaction-type';
import { PaymentMethod } from '../../modules/transactions/enum/payment-method';

export class Transaction {
    constructor(
        public id: number,
        public bankAccountId: number,
        public categoryId: number | null,
        public name: string,
        public amount: number,
        public createdAt: Date,
        public isFavorite: boolean,
        public type: TransactionType,
        public method: PaymentMethod,
    ) {}
}
