import { Request, Response } from 'express';
import { BankAccountsService } from './bank-accounts.service';
import { UnauthorizedError } from '../../shared/errors';

export class BankAccountsController {
    constructor(private readonly service: BankAccountsService) {}

    async create(req: Request, res: Response) {
        const { userId } = req;

        if (!userId) throw new UnauthorizedError();

        const response = await this.service.create(req.body, userId);
        return res.status(201).json(response);
    }

    async update(req: Request, res: Response) {
        const { userId } = req;
        const { bankAccountId } = req.params;

        if (!userId) throw new UnauthorizedError();

        const response = await this.service.update(req.body, Number(bankAccountId), userId);
        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        const { userId } = req;
        const { bankAccountId } = req.params;

        if (!userId) throw new UnauthorizedError();

        await this.service.delete(Number(bankAccountId), userId);
        return res.sendStatus(204);
    }
}
