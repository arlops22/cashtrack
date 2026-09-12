import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors';
import { logger } from '../config/logger.config';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: error.message,
            ...('details' in error ? { details: (error as any).details } : {}),
        });
    }

    logger.error(error);

    return res.status(500).json({
        error: 'Internal Server Error',
    });
};
