import { httpClient } from '../http-client';
import type { BankAccountType } from '../../entities/BankAccount';

interface AccountParams {
    name: string;
    initialBalance?: number;
    color: string;
    type: BankAccountType;
}

export async function create(params: AccountParams) {
    const { data } = await httpClient.post('/bank-accounts', params);
    return data;
}
