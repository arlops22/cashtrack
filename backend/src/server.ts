import express, { Application, Response } from 'express';
import { pinoHttp } from 'pino-http';
import { PrismaClient } from '../prisma/generated/prisma/client';

import { logger } from './config/logger.config';
import { errorHandler } from './shared/middlewares/error-handler.middleware';
import { authenticate } from './shared/middlewares/authenticate.middleware';
import { JwtService } from './shared/auth/jwt.service';
import { AppModule } from './app.module';

export class ServerSetup {
    public app: Application;
    private readonly appModule: AppModule;
    private readonly jwtService: JwtService;

    constructor(
        private port: string = '8000',
        private readonly prisma: PrismaClient,
        private readonly jwtSecret: string,
    ) {
        this.app = express();
        this.jwtService = new JwtService(this.jwtSecret);
        this.appModule = new AppModule(this.prisma, this.jwtSecret);

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
        this.app.use('/bank-accounts', authenticate(this.jwtService), this.appModule.bankAccountsRoutes.router);
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
