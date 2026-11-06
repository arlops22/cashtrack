import { httpClient } from '../http-client';

interface CategoryParams {
    name: string;
}

export async function create(params: CategoryParams) {
    const { data } = await httpClient.post('/categories', params);
    return data;
}
