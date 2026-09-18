import { User } from '../../../shared/entities';
import { CreateUserDto } from '../dto';

export interface IUserRepository {
    create(signUpDTO: CreateUserDto): Promise<User>;
    findUnique(email: string): Promise<Pick<User, 'id'> | null>;
}
