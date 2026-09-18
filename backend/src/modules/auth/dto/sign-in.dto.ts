import * as z from 'zod';

export const signInDtoSchema = z.object({
    email: z.email().nonempty('Must not be empty'),
    password: z.string().nonempty('Must not be empty'),
});

export type SignInDto = z.infer<typeof signInDtoSchema>;
