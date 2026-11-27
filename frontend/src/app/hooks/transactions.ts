import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import type { TransactionsFilter } from '../services/transactionsService/get';
import type { MetricsFilter } from '../services/transactionsService/metrics';
import { transactionsService } from '../services/transactionsService';
import { USER_KEY } from './bank-accounts';

const TRANSACTION_KEY = 'transactions';
const TRANSACTION_METRIC_KEY = 'metrics';

export function useTransactions(filters: TransactionsFilter) {
    const { data, isLoading } = useQuery({
        queryKey: [TRANSACTION_KEY, filters],
        queryFn: () => transactionsService.get(filters),
        enabled: Boolean(filters.bankAccountId),
    });

    return { transactionsData: data, isLoading };
}

export function useTransactionsMetrics(filters: MetricsFilter) {
    const { data, isLoading } = useQuery({
        queryKey: [TRANSACTION_METRIC_KEY, filters],
        queryFn: () => transactionsService.getMetrics(filters),
        enabled: Boolean(filters.bankAccountId && filters.from && filters.to),
    });

    return {
        metrics: data,
        isLoading,
    };
}

export function useCreateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionsService.create,
        onSuccess: () => {
            toast.success('Transaction successfuly created!');
            return Promise.all([
                queryClient.invalidateQueries({ queryKey: [TRANSACTION_KEY] }),
                queryClient.invalidateQueries({ queryKey: [USER_KEY] }),
            ]);
        },
    });
}

export function useUpdateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionsService.update,
        onSuccess: () => {
            toast.success('Transaction successfuly updated!');
            return Promise.all([
                queryClient.invalidateQueries({ queryKey: [TRANSACTION_KEY] }),
                queryClient.invalidateQueries({ queryKey: [USER_KEY] }),
            ]);
        },
    });
}

export function useDeleteTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionsService.delete,
        onSuccess: () => {
            toast.success('Transaction successfuly deleted!');
            return Promise.all([
                queryClient.invalidateQueries({ queryKey: [TRANSACTION_KEY] }),
                queryClient.invalidateQueries({ queryKey: [USER_KEY] }),
            ]);
        },
    });
}
