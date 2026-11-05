import type { Category } from '../../entities/Category';
import { httpClient } from '../http-client';

type CategoriesResponse = Array<Category>;

export async function get() {
    const { data } = await httpClient.get<CategoriesResponse>('/categories');

    return data;
}
