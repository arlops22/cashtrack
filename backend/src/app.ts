import express, { Application, Response } from 'express';
import { pinoHttp } from 'pino-http';

import { logger } from './config/logger.config';
import { errorHandler } from './shared/middlewares/error-handler.middleware';

export class App {
    public app: Application;

    constructor() {
        this.app = express();

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
    }

    private initErrorHandler() {
        this.app.use(errorHandler);
    }

    listen(port: string): void {
        this.app.listen(port, () => {
            console.log(`Server is successfuly running on PORT ${port}`);
        });
    }
}
