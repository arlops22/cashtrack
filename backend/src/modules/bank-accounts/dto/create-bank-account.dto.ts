import * as z from 'zod';

import { BankAccountEnumType } from '../enum/bank-account-type';

export const createBankAccountDtoSchema = z.object({
    name: z.string().nonempty('Must not be empty'),
    initialBalance: z.number().nonnegative(),
    color: z.hex().nonempty('Must not be empty'),
    type: z.enum(Object.values(BankAccountEnumType)),
});

export type CreateBankAccountDto = z.infer<typeof createBankAccountDtoSchema>;
