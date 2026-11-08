import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { bankAccountsService } from '../services/bankAccountsService';

const USER_KEY = 'me';

export function useCreateBankAccount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bankAccountsService.create,
        onSuccess: () => {
            toast.success('Account successfuly created!');
            return queryClient.invalidateQueries({ queryKey: [USER_KEY] });
        },
    });
}

export function useUpdateBankAccount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bankAccountsService.update,
        onSuccess: () => {
            toast.success('Account successfuly updated!');
            return queryClient.invalidateQueries({ queryKey: [USER_KEY] });
        },
    });
}

export function useDeleteBankAccount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bankAccountsService.delete,
        onSuccess: () => {
            toast.success('Account successfuly deleted!');
            return queryClient.invalidateQueries({ queryKey: [USER_KEY] });
        },
    });
}
