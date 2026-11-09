import type { Transaction } from '../../entities/Transaction';
import { httpClient } from '../http-client';

interface TransactionParams {
    name: string;
    amount: number;
    createdAt: string;
    type: Transaction['type'];
    method: Transaction['method'];
    categoryId: number | null;
    bankAccountId: number;
}

export async function create({ bankAccountId, ...params }: TransactionParams) {
    const { data } = await httpClient.post(`/bank-accounts/${bankAccountId}/transactions`, params);
    return data;
}
