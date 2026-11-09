import { httpClient } from '../http-client';

interface Params {
    id: number;
    bankAccountId: number;
}

export async function deleteTransaction({ id, bankAccountId }: Params) {
    const { data } = await httpClient.delete(`/bank-accounts/${bankAccountId}/transactions/${id}`);
    return data;
}
