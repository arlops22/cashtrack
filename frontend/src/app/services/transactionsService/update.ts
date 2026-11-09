import type { Transaction } from '../../entities/Transaction';
import { httpClient } from '../http-client';

interface AccountParams {
    id: number;
    name: string;
    amount: number;
    createdAt: string;
    type: Transaction['type'];
    method: Transaction['method'];
    categoryId: number | null;
    bankAccountId: number;
}

export async function update({ id, bankAccountId, ...params }: AccountParams) {
    const { data } = await httpClient.patch(`/bank-accounts/${bankAccountId}/transactions/${id}`, params);
    return data;
}
