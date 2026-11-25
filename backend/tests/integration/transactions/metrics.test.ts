import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { buildTestServer } from '../../helpers';
import { User } from '../../../src/shared/entities';
import { createAuthenticatedUser, createMetricsScenario } from '../../factories';

describe('GET /bank-accounts/:id/transactions/metrics', () => {
    const server = buildTestServer();
    let user: User, authHeader: string;
    const period = '?from=2026-06-01&to=2026-07-01';

    beforeEach(async () => {
        ({ user, authHeader } = await createAuthenticatedUser());
    });

    it('should return the metrics in the expected response format', async () => {
        const { bankAccount } = await createMetricsScenario(user.id);

        const { status, body } = await request(server)
            .get(`/bank-accounts/${bankAccount.id}/transactions/metrics${period}`)
            .set('Authorization', authHeader);

        expect(status).toBe(200);
        expect(body).toMatchObject({
            summary: expect.objectContaining({
                income: expect.any(Number),
                expense: expect.any(Number),
                balance: expect.any(Number),
            }),
            categorySummary: expect.arrayContaining([
                expect.objectContaining({
                    month: expect.any(String),
                    categoryId: expect.any(Number),
                    categoryName: expect.any(String),
                    categoryColor: expect.any(String),
                    totalAmount: expect.any(Number),
                }),
            ]),
            monthlyTotals: expect.arrayContaining([
                expect.objectContaining({
                    month: expect.any(String),
                    income: expect.any(Number),
                    expense: expect.any(Number),
                    balance: expect.any(Number),
                }),
            ]),
        });
    });

    it('should return the totals of the period', async () => {
        const { bankAccount } = await createMetricsScenario(user.id);

        const { status, body } = await request(server)
            .get(`/bank-accounts/${bankAccount.id}/transactions/metrics${period}`)
            .set('Authorization', authHeader);

        expect(status).toBe(200);
        expect(body.summary).toEqual({ income: 1000, expense: 350, balance: 650 });
    });

    it('should group the amounts by category', async () => {
        const { bankAccount, foodCategory, transportCategory } = await createMetricsScenario(user.id);

        const { status, body } = await request(server)
            .get(`/bank-accounts/${bankAccount.id}/transactions/metrics${period}`)
            .set('Authorization', authHeader);

        expect(status).toBe(200);
        expect(body.categorySummary).toEqual([
            {
                month: new Date('2026-06-01').toISOString(),
                categoryId: foodCategory.id,
                categoryName: foodCategory.name,
                categoryColor: foodCategory.color,
                totalAmount: 100,
            },
            {
                month: new Date('2026-06-01').toISOString(),
                categoryId: transportCategory.id,
                categoryName: transportCategory.name,
                categoryColor: transportCategory.color,
                totalAmount: 250,
            },
        ]);
    });

    it('should return the income and expense totals per month', async () => {
        const { bankAccount } = await createMetricsScenario(user.id);

        const { status, body } = await request(server)
            .get(`/bank-accounts/${bankAccount.id}/transactions/metrics${period}`)
            .set('Authorization', authHeader);

        expect(status).toBe(200);
        expect(body.monthlyTotals).toEqual([
            expect.objectContaining({
                month: new Date('2026-06-01').toISOString(),
                income: 1000,
                expense: 350,
                balance: 650,
            }),
        ]);
    });

    it('should return unauthorized when no token is provided', async () => {
        const { bankAccount } = await createMetricsScenario(user.id);

        const { status } = await request(server).get(`/bank-accounts/${bankAccount.id}/transactions/metrics`);

        expect(status).toBe(401);
    });
});
