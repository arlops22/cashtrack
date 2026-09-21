import { Request, Response } from 'express';
import { BankAccountsService } from './bank-accounts.service';

export class BankAccountsController {
    constructor(private readonly service: BankAccountsService) {}

    async create(req: Request, res: Response) {
        const response = await this.service.create(req.body);
        return res.status(201).json(response);
    }
    async update(req: Request, res: Response) {
        const response = await this.service.update(req.body);
        return res.status(200).json(response);
    }
    async delete(req: Request, res: Response) {
        await this.service.delete();
        return res.sendStatus(204);
    }
}
