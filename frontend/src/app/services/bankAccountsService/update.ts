import { httpClient } from '../http-client';
import type { BankAccountType } from '../../entities/BankAccount';

interface AccountParams {
    id: number;
    name: string;
    color: string;
    type: BankAccountType;
}

export async function update({ id, ...params }: AccountParams) {
    const { data } = await httpClient.patch(`/bank-accounts/${id}`, params);
    return data;
}
