import express, { Application } from 'express';

export class App {
    public app: Application;

    constructor() {
        this.app = express();
    }

    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    listen(port: string): void {
        this.app.listen(port, () => {
            console.log(`Server is successfuly running on PORT ${port}`);
        });
    }
}
