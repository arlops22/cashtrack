import { create } from './create';
import { update } from './update';
import { deleteAccount } from './delete';

export const bankAccountsService = {
    create,
    update,
    delete: deleteAccount,
};
