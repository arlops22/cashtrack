import { JwtService } from '../../src/shared/auth/jwt.service';
import { createTestUser } from './create-test-user';
import { TEST_JWT_SECRET } from './test-config';

export const createAuthenticatedUser = async () => {
    const { user } = await createTestUser();

    const token = new JwtService(TEST_JWT_SECRET).sign({ sub: user.id });

    return { user, authHeader: `Bearer ${token}` };
};
