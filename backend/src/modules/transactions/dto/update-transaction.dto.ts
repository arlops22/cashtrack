import { CreateTransactionDto, createTransactionDtoSchema } from './create-transaction.dto';

export const updateTransactionDtoSchema = createTransactionDtoSchema.partial();

export type UpdateTransactionDto = CreateTransactionDto;
