import { Request, Response } from 'express';

import { TransactionsService } from './transactions.service';
import * as metricsPresenter from './presenters/metrics.presenter';

export class TransactionsController {
    constructor(private readonly service: TransactionsService) {}

    async create(req: Request, res: Response) {
        const { userId } = req;
        const { bankAccountId } = req.params;

        const response = await this.service.create(req.body, Number(bankAccountId), Number(userId));
        return res.status(201).json(response);
    }

    async getAll(req: Request, res: Response) {
        const { userId } = req;
        const { bankAccountId } = req.params;

        const response = await this.service.list(req.query, Number(bankAccountId), Number(userId));
        return res.status(200).json(response);
    }

    async getMetrics(req: Request, res: Response) {
        const { userId } = req;
        const { bankAccountId } = req.params;

        const { summary, categorySummary, monthlyTotals } = await this.service.getMetrics(
            req.query,
            Number(bankAccountId),
            Number(userId),
        );
        return res.status(200).json({
            summary,
            categorySummary: metricsPresenter.presentCategoriesByMonth(categorySummary),
            monthlyTotals: metricsPresenter.presentIncomeExpenseByMonth(monthlyTotals),
        });
    }

    async update(req: Request, res: Response) {
        const { userId } = req;
        const { bankAccountId, transactionId } = req.params;

        const response = await this.service.update(
            req.body,
            Number(transactionId),
            Number(bankAccountId),
            Number(userId),
        );
        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        const { userId } = req;
        const { bankAccountId, transactionId } = req.params;

        await this.service.delete(Number(transactionId), Number(bankAccountId), Number(userId));
        return res.sendStatus(204);
    }
}
