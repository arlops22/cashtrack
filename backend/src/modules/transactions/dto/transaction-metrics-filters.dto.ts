import { z } from 'zod';

const dateStringUTC = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must have YYYY-MM-DD format');

export const transactionMetricsFilterQueryParamSchema = z.object({
    from: dateStringUTC.optional(),
    to: dateStringUTC.optional(),
});

export type TransactionMetricsFilterQueryDto = z.infer<typeof transactionMetricsFilterQueryParamSchema>;
