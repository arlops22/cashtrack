import { PrismaClient } from '../../../prisma/generated/prisma/client';

import { User } from '../../shared/entities';
import { CreateUserDto } from './dto/create-user.dto';
import { IUsersRepository } from './interfaces/users-repository';

export class UsersRepository implements IUsersRepository {
    constructor(private readonly prisma: PrismaClient) {}

    create(createUserDTO: CreateUserDto) {
        return this.prisma.user.create({
            data: createUserDTO,
        });
    }

    findExistingEmail(email: string): Promise<Pick<User, 'id'> | null> {
        return this.prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
}
