import type { BankAccount } from '../../entities/BankAccount';
import { httpClient } from '../http-client';

interface AccountParams {
    id: number;
    name: string;
    color: string;
    type: BankAccount['type'];
}

export async function update({ id, ...params }: AccountParams) {
    const { data } = await httpClient.patch(`/bank-accounts/${id}`, params);
    return data;
}
