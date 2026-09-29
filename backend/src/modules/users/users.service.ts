import { User } from '../../shared/entities';
import { IUsersRepository } from './interfaces/users-repository';

export class UsersService {
    constructor(private readonly userRepo: IUsersRepository) {}

    getById(userId: number): Promise<Omit<User, 'password' | 'createdAt'> | null> {
        return this.userRepo.findById(userId);
    }
}
