import { Request, Response } from 'express';

import { CategoriesService } from './categories.service';
import { UnauthorizedError } from '../../shared/errors';

export class CategoriesController {
    constructor(private readonly service: CategoriesService) {}

    async getAll(req: Request, res: Response) {
        const { userId } = req;

        if (!userId) throw new UnauthorizedError();

        const response = await this.service.getListByUserId(userId);
        return res.status(200).json(response);
    }

    async create(req: Request, res: Response) {
        const { userId } = req;

        if (!userId) throw new UnauthorizedError();

        const response = await this.service.create(req.body, userId);
        return res.status(201).json(response);
    }

    async update(req: Request, res: Response) {
        const { userId } = req;
        const { categoryId } = req.params;

        if (!userId) throw new UnauthorizedError();

        const response = await this.service.update(req.body, Number(categoryId), userId);
        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        const { userId } = req;
        const { categoryId } = req.params;

        if (!userId) throw new UnauthorizedError();

        await this.service.delete(Number(categoryId), userId);
        return res.sendStatus(204);
    }
}
