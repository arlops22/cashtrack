export const BankAccountTypeEnum = {
    CHECKING: 'CHECKING',
    SAVING: 'SAVING',
    INVESTMENT: 'INVESTMENT',
} as const;

export type BankAccountType = (typeof BankAccountTypeEnum)[keyof typeof BankAccountTypeEnum];
