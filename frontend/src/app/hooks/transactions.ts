import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import type { TransactionsFilter } from '../services/transactionsService/get';
import { transactionsService } from '../services/transactionsService';

const TRANSACTION_KEY = 'transactions';

export function useTransactions(filters: TransactionsFilter) {
    const { data, isLoading, refetch } = useQuery({
        queryKey: [TRANSACTION_KEY],
        queryFn: () => transactionsService.get(filters),
    });

    return { transactions: data ?? [], isLoading, refetchTransactions: refetch };
}

export function useCreateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionsService.create,
        onSuccess: () => {
            toast.success('Transaction successfuly created!');
            return queryClient.invalidateQueries({ queryKey: [TRANSACTION_KEY] });
        },
    });
}

export function useUpdateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionsService.update,
        onSuccess: () => {
            toast.success('Transaction successfuly updated!');
            return queryClient.invalidateQueries({ queryKey: [TRANSACTION_KEY] });
        },
    });
}

export function useDeleteTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionsService.delete,
        onSuccess: () => {
            toast.success('Transaction successfuly deleted!');
            return queryClient.invalidateQueries({ queryKey: [TRANSACTION_KEY] });
        },
    });
}
