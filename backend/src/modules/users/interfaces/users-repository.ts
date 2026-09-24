import { User } from '../../../shared/entities';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUsersRepository {
    create(signUpDTO: CreateUserDto): Promise<User>;
    findExistingEmail(email: string): Promise<Pick<User, 'id'> | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<Omit<User, 'password' | 'createdAt'> | null>;
}
