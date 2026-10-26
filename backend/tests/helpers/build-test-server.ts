import { ServerSetup } from '../../src/server';
import { prisma } from '../../src/shared/database/prisma-client';
import { TEST_JWT_SECRET } from './test-config';

export const buildTestServer = () => {
    return new ServerSetup('8000', prisma, TEST_JWT_SECRET).app;
};
