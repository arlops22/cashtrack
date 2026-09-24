import z from 'zod';
import { compare, hash } from 'bcrypt';
import { randomInt } from 'node:crypto';

import { ConflictError, UnauthorizedError, ValidationError } from '../../shared/errors';
import { IUsersRepository } from '../users/interfaces/users-repository';
import { CreateUserDto, createUserDtoSchema } from '../users/dto/create-user.dto';
import { IJwtService } from '../../shared/auth/interface/jwt-service.interface';
import { SignInDto, signInDtoSchema } from './dto/sign-in.dto';

export class AuthService {
    constructor(
        private readonly userRepo: IUsersRepository,
        private readonly jwtService: IJwtService,
    ) {}

    async signIn(signInDto: SignInDto) {
        const { password, email } = signInDto;

        const validation = signInDtoSchema.safeParse(signInDto);
        if (!validation.success) {
            throw new ValidationError('Invalid credentials', z.flattenError(validation.error).fieldErrors);
        }

        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new UnauthorizedError('Invalid credentials');

        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) throw new UnauthorizedError('Invalid credentials');

        const accessToken = this.generateAccessToken(user.id);

        return { accessToken };
    }

    async signUp(signUpDto: CreateUserDto) {
        const { firstName, lastName, email, password } = signUpDto;

        const validation = createUserDtoSchema.safeParse(signUpDto);
        if (!validation.success) {
            throw new ValidationError('Invalid user data', z.flattenError(validation.error).fieldErrors);
        }

        const emailTaken = await this.userRepo.findExistingEmail(email);
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
