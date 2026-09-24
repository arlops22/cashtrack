import { NextFunction, Request, Response } from 'express';
import * as z from 'zod';

import { ValidationError } from '../errors';

type RequestPart = 'params' | 'body' | 'query';

export const validate = <T extends z.ZodType>(part: RequestPart, paramsSchema: T) => {
    return (req: Request, _: Response, next: NextFunction) => {
        const result = paramsSchema.safeParse(req[part]);
        if (!result.success) {
            const { fieldErrors } = z.flattenError(result.error);
            const errors = Object.fromEntries(
                Object.entries(fieldErrors).filter(([, value]) => value !== undefined),
            ) as Record<string, string[]>;

            throw new ValidationError(`Invalid ${part}`, errors);
        }

        req[part] = result.data;
        next();
    };
};
