import { BankAccount } from './bank-account.entity';
import { Category } from './category.entity';

export class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password?: string,
        public createdAt?: Date,
        public categories?: Category[],
        public bankAccounts?: BankAccount[],
    ) {}
}
