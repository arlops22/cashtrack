export const PaymentMethodEnum = {
    CREDIT: 'CREDIT',
    DEBIT: 'DEBIT',
    PIX: 'PIX',
    CASH: 'CASH',
} as const;

export type PaymentMethod = (typeof PaymentMethodEnum)[keyof typeof PaymentMethodEnum];
