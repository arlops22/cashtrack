import { afterAll, beforeEach } from 'vitest';

import { prisma } from '../src/shared/database/prisma-client';

const resetDB = async () => {
    if (!process.env.DATABASE_URL?.includes('_test')) {
        throw new Error('resetDB só pode rodar em um banco de teste');
    }

    await prisma.$transaction([
        prisma.transaction.deleteMany(),
        prisma.category.deleteMany(),
        prisma.bankAccount.deleteMany(),
        prisma.user.deleteMany(),
    ]);
};

beforeEach(async () => {
    await resetDB();
});

afterAll(async () => {
    await prisma.$disconnect();
});
