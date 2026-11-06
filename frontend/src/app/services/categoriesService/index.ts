import { get } from './get';
import { create } from './create';
import { update } from './update';
import { deleteCategory } from './delete';

export const categoriesService = {
    get,
    create,
    update,
    delete: deleteCategory,
};
