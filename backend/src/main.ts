import { ServerSetup } from './server';
import { prisma } from './shared/database/prisma-client';

const PORT = process.env['PORT'] || '8000';
const SECRET = process.env['JWT_SECRET'] as string;

const server = new ServerSetup(PORT, prisma, SECRET);

server.start();
