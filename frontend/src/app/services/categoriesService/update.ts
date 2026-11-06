import { httpClient } from '../http-client';

interface CategoryParams {
    id: number;
    name: string;
}

export async function update({ id, ...params }: CategoryParams) {
    const { data } = await httpClient.patch(`/categories/${id}`, params);
    return data;
}
