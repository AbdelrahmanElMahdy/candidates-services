import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/interfaces/controller.interface';
import HttpException from '../utils/exceptions/http.exception';

class CandidateController implements Controller {
    public path = '/candidates';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, this.createCandidates);
        this.router.get(`${this.path}/:id(\\d)?`, this.getCandidates)

    }
    private createCandidates = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            response.status(201).json('candidate created');
        } catch (error) {
            next(new HttpException(400, 'Cannot create candidate'));
        }
    };
    
    private getCandidates = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            response.status(200).json({"candidates_id":[1,2,3,4,4]});
        } catch (error) {
            next(new HttpException(400, 'Cannot create candidate'));
        }
    };
}

export default CandidateController;
