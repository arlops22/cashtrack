import z from 'zod';
import { hash } from 'bcrypt';
import { randomInt } from 'node:crypto';

import { ConflictError, ValidationError } from '../../shared/errors';
import { IUserRepository } from '../users/interfaces/user-repository';
import { CreateUserDto, createUserDtoSchema } from '../users/dto';
import { IJwtService } from '../../shared/auth/interface/jwt-service.interface';

export class AuthService {
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly jwtService: IJwtService,
    ) {}

    signIn() {}

    async signUp(signUpDto: CreateUserDto) {
        const { firstName, lastName, email, password } = signUpDto;

        const validation = createUserDtoSchema.safeParse(signUpDto);
        if (!validation.success) {
            throw new ValidationError('Invalid user data', z.flattenError(validation.error).fieldErrors);
        }

        const emailTaken = await this.userRepo.findUnique(email);
        if (emailTaken) throw new ConflictError('This e-mail is already in use!');

        const randomSalt = randomInt(10, 16);
        const hashedPassword = await hash(password, randomSalt);

        const user = await this.userRepo.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        const accessToken = this.generateAccessToken(user.id);

        return { accessToken };
    }

    private generateAccessToken(userId: number) {
        return this.jwtService.sign({ sub: userId });
    }
}
