import { httpClient } from '../http-client';

export type MonthlySummary = {
    month: string;
    summary: {
        totalIncome: number;
        totalExpense: number;
        periodBalance: number;
    };
};

export type ByCategorySummary = {
    month: string;
    categoryId: number;
    categoryName: string;
    totalAmount: number;
    categoryColor: string;
};

export type MetricsResponse = {
    summary: {
        totalIncome: number;
        totalExpense: number;
        periodBalance: number;
    };
    categorySummary: ByCategorySummary[];
    monthlyTotals: MonthlySummary[];
};

export type MetricsFilter = {
    bankAccountId: number;
    from: string;
    to: string;
};
export async function getMetrics({ bankAccountId, ...filters }: MetricsFilter) {
    const { data } = await httpClient.get<MetricsResponse>(`/bank-accounts/${bankAccountId}/transactions/metrics`, {
        params: filters,
    });

    return data;
}
