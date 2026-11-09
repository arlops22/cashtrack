import * as z from 'zod';

import { BankAccountTypeEnum } from '../enum/bank-account-type';

export const createBankAccountDtoSchema = z.object({
    name: z.string().nonempty('Must not be empty'),
    initialBalance: z.number().nonnegative(),
    color: z.string().regex(/^#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, 'Must be a valid hex color (e.g. #FF5733)'),
    type: z.enum(Object.values(BankAccountTypeEnum)),
});

export type CreateBankAccountDto = z.infer<typeof createBankAccountDtoSchema>;
