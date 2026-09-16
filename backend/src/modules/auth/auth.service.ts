import z from 'zod';

import { ConflictError, ValidationError } from '../../shared/errors';
import { SignUpDto } from './dto';
import { signUpDtoSchema } from './dto/sign-up.dto';
import { IUserRepository } from './interfaces/user-repository';
import { hash } from 'bcrypt';
import { randomInt } from 'node:crypto';

export class AuthService {
    constructor(private readonly userRepo: IUserRepository) {}

    signIn() {}

    async signUp(signUpDto: SignUpDto) {
        const { firstName, lastName, email, password } = signUpDto;

        const validation = signUpDtoSchema.safeParse(signUpDto);
        if (!validation.success) {
            throw new ValidationError('Invalid user data', z.flattenError(validation.error).fieldErrors);
        }

        const emailTaken = await this.userRepo.findUnique(email);
        if (emailTaken) throw new ConflictError('This e-mail is already in use!');

        // criptografa senha
        const randomSalt = randomInt(10, 16);
        const hashedPassword = await hash(password, randomSalt);

        // cria user
        const user = await this.userRepo.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // envia access token para cliente
    }
}
