import { User } from '../../../shared/entities';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository {
    create(signUpDTO: CreateUserDto): Promise<User>;
    findEmail(email: string): Promise<Pick<User, 'id'> | null>;
    findUnique(email: string): Promise<User | null>;
}
