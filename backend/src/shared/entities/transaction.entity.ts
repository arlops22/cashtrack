import { TransactionType } from '../../modules/transactions/enum/transaction-type';
import { PaymentMethod } from '../../modules/transactions/enum/payment-method';
import { Category } from './category.entity';

export class Transaction {
    constructor(
        public id: number,
        public name: string,
        public amount: number,
        public createdAt: Date,
        public isFavorite: boolean,
        public type: TransactionType,
        public method: PaymentMethod,
        public category?: Category | null,
    ) {}
}
