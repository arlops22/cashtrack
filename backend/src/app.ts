import express, { Application, Response } from 'express';
import { pinoHttp } from 'pino-http';
import { logger } from './config/logger.config';

export class App {
    public app: Application;

    constructor() {
        this.app = express();

        this.initMiddlewares();
        this.initializeRoutes();
    }

    private initMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(pinoHttp({ logger }));
    }

    private initializeRoutes() {
        this.app.get('/health-check', (_, res: Response) => {
            res.status(200).json({ message: 'API running well!' });
        });
    }

    listen(port: string): void {
        this.app.listen(port, () => {
            console.log(`Server is successfuly running on PORT ${port}`);
        });
    }
}
