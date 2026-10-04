import { BankAccountType } from '../../modules/bank-accounts/enum/bank-account-type';

export class BankAccount {
    constructor(
        public id: number,
        public name: string,
        public currentBalance: number,
        public color: string,
        public type: BankAccountType,
        public userId?: number,
        public initialBalance?: number,
    ) {}
}
