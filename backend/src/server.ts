import express, { Application, Response } from 'express';
import { pinoHttp } from 'pino-http';
import { PrismaClient } from '../prisma/generated/prisma/client';

import { logger } from './config/logger.config';
import { errorHandler } from './shared/middlewares/error-handler.middleware';
import { AppModule } from './app.module';

export class ServerSetup {
    public app: Application;
    private readonly appModule: AppModule;

    constructor(
        private port = 8000,
        private readonly prisma: PrismaClient,
    ) {
        this.app = express();
        this.appModule = new AppModule(this.prisma);

        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandler();
    }

    private initMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(pinoHttp({ logger }));
    }

    private initRoutes() {
        this.app.get('/health-check', (_, res: Response) => {
            res.status(200).json({ message: 'API running well!' });
        });

        this.app.use('/auth', this.appModule.authRoutes.router);
    }

    private initErrorHandler() {
        this.app.use(errorHandler);
    }

    start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is successfuly running on PORT ${this.port}`);
        });
    }
}
