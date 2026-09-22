import { BankAccountType } from '../../modules/bank-accounts/enum/bank-account-type';

export class BankAccount {
    constructor(
        public id: number,
        public userId: number,
        public name: string,
        public initialBalance: number,
        public currentBalance: number,
        public color: string,
        public type: BankAccountType,
    ) {}
}
