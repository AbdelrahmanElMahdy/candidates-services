import 'dotenv/config'
import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import { Sequelize } from 'sequelize-typescript';
import Candidate from './resources/candidate.repository';
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
        this.initializeDateBase();
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
    private async initializeDateBase(): Promise<void> {
        const sequelize = new Sequelize({
            username:process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME,
            host:process.env.DB_HOST,
            dialect:"postgres",
            models: [Candidate],
        });
        try {
            await sequelize.authenticate();
            await sequelize.sync({ alter: true });
            console.log('database connected');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
export default App;
