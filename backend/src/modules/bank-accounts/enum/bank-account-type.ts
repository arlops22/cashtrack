export const BankAccountEnumType = {
    CHECKING: 'CHECKING',
    SAVING: 'SAVING',
    INVESTMENT: 'INVESTMENT',
} as const;

export type BankAccountType = (typeof BankAccountEnumType)[keyof typeof BankAccountEnumType];
