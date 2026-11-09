import { get } from './get';
import { create } from './create';
import { update } from './update';
import { deleteTransaction } from './delete';

export const transactionsService = {
    get,
    create,
    update,
    delete: deleteTransaction,
};
