export const BankAccountTypeEnum = {
    CHECKING: 'CHECKING',
    SAVING: 'SAVING',
    INVESTMENT: 'INVESTMENT',
} as const;

export type BankAccountType = (typeof BankAccountTypeEnum)[keyof typeof BankAccountTypeEnum];

export interface BankAccount {
    id: number;
    name: string;
    initialBalance?: number;
    currentBalance: number;
    color: string;
    type: BankAccountType;
}
