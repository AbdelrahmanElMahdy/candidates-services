import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './candidate.validation';
import CandidateService from './candidate.service';
import CandidateI from './candidate.interface';
import { createToken } from '../../utils/Token';
import authenticatedMiddleware from '../../middleware/authenticate.middleware';
class CandidateController implements Controller {
    public path = '/candidates';
    public router = Router();
    private CandidateService = new CandidateService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.createCandidate),
            this.createCandidates
        );

        this.router.get(
            `${this.path}/:id(\\d*)?`,
            authenticatedMiddleware,
            this.getCandidates
        );
        this.router.delete(
            `${this.path}/:id(\\d*)`,
            authenticatedMiddleware,
            this.deleteCandidate
        );
    }
    private createCandidates = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { first_name, last_name, phone, avatar, email, job_title } =
                request.body;
            let candidate = await this.CandidateService.create({
                first_name,
                last_name,
                phone,
                avatar,
                email,
                job_title,
            });
            let token = await createToken(candidate.id as number);
            response.status(201).json({ candidate, token });
        } catch (error) {
            next(error);
        }
    };

    /*
     * this controller handle route for getting by id or get all
     */
    private getCandidates = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            let candidate_id = request.params.id;
            let candidates: CandidateI | CandidateI[];

            if (candidate_id)
                candidates = await this.CandidateService.getCandidateById(
                    Number(candidate_id)
                );
            else candidates = await this.CandidateService.getCandidates();

            response.status(200).json({ candidates });
        } catch (error) {
            next(error);
        }
    };
    private deleteCandidate = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            let candidate_id = request.params.id;
            await this.CandidateService.deleteCandidate(
                Number(candidate_id),
                request.candidate_id
            );

            response.status(204).json({ message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default CandidateController;
