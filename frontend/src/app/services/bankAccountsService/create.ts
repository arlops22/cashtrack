import type { BankAccount } from '../../entities/BankAccount';
import { httpClient } from '../http-client';

interface AccountParams {
    name: string;
    initialBalance?: number;
    color: string;
    type: BankAccount['type'];
}

export async function create(params: AccountParams) {
    const { data } = await httpClient.post('/bank-accounts', params);
    return data;
}
