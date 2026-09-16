import { User } from '../../../shared/entities';
import { SignUpDto } from '../dto';

export interface IUserRepository {
    create(signUpDTO: SignUpDto): Promise<User>;
    findUnique(email: string): Promise<Pick<User, 'id'> | null>;
}
