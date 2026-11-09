import type { Transaction } from '../../entities/Transaction';
import { httpClient } from '../http-client';

type TransactionsResponse = Array<Transaction>;

export type TransactionsFilter = {
    bankAccountId: number;
    type?: Transaction['type'];
    method?: Transaction['method'];
    category?: number;
    month: number;
    year: number;
};

export async function get({ bankAccountId, ...filters }: TransactionsFilter) {
    const { data } = await httpClient.get<TransactionsResponse>(`/bank-accounts/${bankAccountId}/transactions`, {
        params: filters,
    });

    return data;
}
