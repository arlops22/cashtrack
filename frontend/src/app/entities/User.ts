import type { BankAccount } from './BankAccount';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    bankAccounts: BankAccount[];
}
