import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';

import ErrorMiddleware from './middleware/error.middleware';
import Controller from './utils/interfaces/controller.interface';

class App {
    public express: Application;
    public port: number = 5000;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }
    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }
    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/v1', controller.router);
        });
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
export default App;
