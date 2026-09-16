import { ConflictError } from '../../shared/errors';
import { SignUpDto } from './dto';
import { IUserRepository } from './interfaces/user-repository';

export class AuthService {
    constructor(private readonly userRepo: IUserRepository) {}

    signIn() {}

    async signUp(signUpDto: SignUpDto) {
        const { firstName, lastName, email, password } = signUpDto;

        const emailTaken = await this.userRepo.findUnique(email);
        if (emailTaken) throw new ConflictError('This e-mail is already in use!');

        // criptografa senha
        const hashedPassword = password;

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
