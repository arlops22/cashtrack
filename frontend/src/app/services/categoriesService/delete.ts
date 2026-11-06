import { httpClient } from '../http-client';

export async function deleteCategory(id: number) {
    const { data } = await httpClient.delete(`/categories/${id}`);
    return data;
}
