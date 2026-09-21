import * as z from 'zod';

export const createUserDtoSchema = z.object({
    firstName: z.string().nonempty('Must not be empty'),
    lastName: z.string().nonempty('Must not be empty'),
    email: z.email().nonempty('Must not be empty'),
    password: z.string().nonempty('Must not be empty').min(8),
});

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
