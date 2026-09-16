import { ServerSetup } from './server';
import { prisma } from './shared/database/prisma-client';

const PORT = 8000;
const server = new ServerSetup(PORT, prisma);

server.start();
