import { Request, Response } from 'express';

export class AuthController {
    signIn(req: Request, res: Response) {
        return res.status(200).json({ message: 'Sign In Route' });
    }

    signUp(req: Request, res: Response) {
        return res.status(200).json({ message: 'Sign Up Route' });
    }
}
