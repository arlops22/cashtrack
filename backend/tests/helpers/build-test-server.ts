import { ServerSetup } from '../../src/server';
import { prisma } from '../../src/shared/database/prisma-client';

export const buildTestServer = () => {
    const TEST_JWT_SECRET = 'test-secret';
    return new ServerSetup('8000', prisma, TEST_JWT_SECRET).app;
};
