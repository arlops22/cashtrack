import bcrypt from 'bcrypt';

import { CreateUserDto } from '../../src/modules/users/dto/create-user.dto';
import { prisma } from '../../src/shared/database/prisma-client';
import { buildCreateUserDto } from '../builders/user-dto.builder';

export const createTestUser = async (overrides: Partial<CreateUserDto> = {}) => {
    const data = buildCreateUserDto(overrides);

    const user = await prisma.user.create({
        data: {
            ...data,
            password: await bcrypt.hash(data.password, 10),
        },
    });

    return { user, plainPassword: data.password };
};
