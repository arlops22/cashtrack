import { AppError } from './app.error';

export class UnauthorizedError extends AppError {
    constructor(message = 'Unaithorized') {
        super(message, 401);
    }
}
