import { CreateUserDto } from '../../src/modules/users/dto/create-user.dto';

export const buildCreateUserDto = (overrides: Partial<CreateUserDto> = {}): CreateUserDto => ({
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@email.com',
    password: 'test123123',
    ...overrides,
});
