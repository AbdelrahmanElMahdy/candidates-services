import { Request, Response, NextFunction } from 'express';
import token from '../utils/Token';
import Token from '../utils/interfaces/auth.interface';
import HttpException from '../utils/exceptions/http.exception';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        export interface Request {
            candidate_id: number;
        }
    }
}

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorized'));
    }

    const accessToken = bearer.split('Bearer ')[1].trim();
    try {
        const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
            accessToken
        );

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorised'));
        }

        req.candidate_id = payload.id;

        return next();
    } catch (error) {
        return next(new HttpException(401, 'Unauthorised'));
    }
}

export default authenticatedMiddleware;
