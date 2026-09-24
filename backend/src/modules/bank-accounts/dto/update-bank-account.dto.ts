import { CreateBankAccountDto, createBankAccountDtoSchema } from './create-bank-account.dto';

export const updateBankAccountDtoSchema = createBankAccountDtoSchema.partial();

export type UpdateBankAccountDto = CreateBankAccountDto;
