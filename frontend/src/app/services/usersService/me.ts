import type { User } from '../../../entities/User';
import { httpClient } from '../http-client';

export async function me() {
    const { data } = await httpClient.get<User>('/me');

    return data;
}
