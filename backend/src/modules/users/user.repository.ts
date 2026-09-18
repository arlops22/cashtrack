import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { User } from '../../shared/entities';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from './interfaces/user-repository';

export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    create(createUserDTO: CreateUserDto) {
        return this.prisma.user.create({
            data: createUserDTO,
        });
    }

    findEmail(email: string): Promise<Pick<User, 'id'> | null> {
        return this.prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });
    }

    findUnique(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
