import { httpClient } from '../http-client';

export type MonthlySummary = {
    month: string;
    income: number;
    expense: number;
    balance: number;
};

export type ByCategorySummary = {
    month: string;
    categoryId: number;
    categoryName: string;
    categoryColor: string;
    totalAmount: number;
};

export type MetricsResponse = {
    summary: {
        income: number;
        expense: number;
        balance: number;
    };
    categorySummary: ByCategorySummary[];
    monthlyTotals: MonthlySummary[];
};

export type MetricsFilter = {
    bankAccountId: number;
    from?: string;
    to?: string;
};

export async function getMetrics({ bankAccountId, ...filters }: MetricsFilter) {
    const { data } = await httpClient.get<MetricsResponse>(`/bank-accounts/${bankAccountId}/transactions/metrics`, {
        params: filters,
    });

    return data;
}
