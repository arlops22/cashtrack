export const TransactionTypeEnum = {
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE',
} as const;

export type TransactionType = (typeof TransactionTypeEnum)[keyof typeof TransactionTypeEnum];
