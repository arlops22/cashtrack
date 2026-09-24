import { NextFunction, Request, Response } from 'express';
import * as z from 'zod';

import { ValidationError } from '../errors';

type RequestPart = 'params' | 'body' | 'query';

export const validate = <T extends z.ZodType>(part: RequestPart, paramsSchema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = paramsSchema.safeParse(req[part]);
        if (!validation.success) {
            const { fieldErrors } = z.flattenError(validation.error);
            const errors = Object.fromEntries(
                Object.entries(fieldErrors).filter(([, value]) => value !== undefined),
            ) as Record<string, string[]>;

            throw new ValidationError(`Invalid ${part}`, errors);
        }

        req[part] = validation.data;
        next();
    };
};
