import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { User } from '../../shared/entities';
import { CreateUserDto } from './dto';
import { IUserRepository } from './interfaces/user-repository';

export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    create(createUserDTO: CreateUserDto) {
        return this.prisma.user.create({
            data: createUserDTO,
        });
    }

    findUnique(email: string): Promise<Pick<User, 'id'> | null> {
        return this.prisma.user.findFirst({
            where: { email },
            select: { id: true },
        });
    }
}
