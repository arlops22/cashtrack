import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../../../prisma/generated/prisma/client';
import { logger } from '../../config/logger.config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
    adapter,
    log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
    ],
});

prisma.$on('query', e => {
    logger.info(
        {
            prisma: {
                query: e.query,
                params: e.params,
                duration: `${e.duration}ms`,
            },
        },
        'Prisma Query executed',
    );
});

prisma.$on('info', e => {
    logger.info({ prisma: { message: e.message } }, 'Prisma Info');
});

prisma.$on('warn', e => {
    logger.warn({ prisma: { message: e.message } }, 'Prisma Warning');
});

prisma.$on('error', e => {
    logger.error({ prisma: { message: e.message } }, 'Prisma Error');
});

export { prisma };
