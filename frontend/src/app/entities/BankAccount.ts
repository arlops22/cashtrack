export interface BankAccount {
    id: number;
    name: string;
    initialBalance?: number;
    currentBalance: number;
    color: string;
    type: 'CHECKING' | 'SAVING' | 'INVESTMENT';
}
