import { httpClient } from '../http-client';

export async function deleteAccount(id: number) {
    const { data } = await httpClient.delete(`/bank-accounts/${id}`);
    return data;
}
