import { get } from './get';
import { create } from './create';
import { update } from './update';
import { deleteTransaction } from './delete';
import { getMetrics } from './metrics';

export const transactionsService = {
    get,
    getMetrics,
    create,
    update,
    delete: deleteTransaction,
};
