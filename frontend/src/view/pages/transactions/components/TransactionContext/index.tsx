import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import type { Transaction } from '../../../../../app/entities/Transaction';
import type { BankAccount } from '../../../../../app/entities/BankAccount';
import { useAuth } from '../../../../../app/hooks/useAuth';
import { useDeleteTransaction, useTransactions } from '../../../../../app/hooks/transactions';
import { useCategories } from '../../../../../app/hooks/categories';
import type { Category } from '../../../../../app/entities/Category';

type ModalState = {
    type: 'closed' | 'create' | 'edit' | 'delete';
    transaction?: Transaction;
};

type FilterState = {
    account: string;
    type: Transaction['type'] | 'All';
    month: number;
    year: number;
};

export interface TransactionContextProps {
    filters: FilterState;
    categories: Category[];
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    transactions: Transaction[];
    accounts: BankAccount[];
    modal: ModalState;
    isLoadingTransactions: boolean;
    isLoadingDelete: boolean;
    onOpenEditModal: (transaction: Transaction) => void;
    onOpenDeleteModal: (transaction: Transaction) => void;
    onOpenCreateModal: () => void;
    onDeleteTransaction: () => void;
    onCloseModal: () => void;
}

export const TransactionContext = createContext<TransactionContextProps | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading } = useAuth();
    const { mutate: deleteTransaction, isPending } = useDeleteTransaction();

    const [modal, setModal] = useState<ModalState>({ type: 'closed' });
    const [filters, setFilters] = useState<FilterState>({
        account: user?.bankAccounts[0].id.toString() ?? '',
        type: 'All',
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const { transactions, refetchTransactions, isLoading } = useTransactions({
        bankAccountId: Number(filters.account),
        type: filters.type !== 'All' ? filters.type : undefined,
        month: filters.month,
        year: filters.year,
    });

    const { categories, isLoading: isLoadingCategories } = useCategories();

    const onOpenEditModal = useCallback((transaction: Transaction) => {
        setModal({ type: 'edit', transaction });
    }, []);

    const onOpenDeleteModal = useCallback((transaction: Transaction) => {
        setModal({ type: 'delete', transaction });
    }, []);

    const onOpenCreateModal = useCallback(() => {
        setModal({ type: 'create' });
    }, []);

    const onCloseModal = useCallback(() => {
        setModal(oldState => ({ ...oldState, type: 'closed' }));
    }, []);

    const onDeleteTransaction = useCallback(() => {
        if (!modal.transaction || !filters.account) return;

        deleteTransaction(
            { id: modal.transaction.id, bankAccountId: Number(filters.account) },
            {
                onSuccess: onCloseModal,
            },
        );
    }, [modal, deleteTransaction, onCloseModal]);

    useEffect(() => {
        refetchTransactions();
    }, [filters, refetchTransactions]);

    const value = useMemo<TransactionContextProps>(
        () => ({
            categories,
            filters,
            setFilters,
            transactions,
            accounts: user?.bankAccounts ?? [],
            isLoadingTransactions: isUserLoading || isLoadingCategories || isLoading,
            modal,
            isLoadingDelete: isPending,
            onOpenEditModal,
            onOpenDeleteModal,
            onOpenCreateModal,
            onDeleteTransaction,
            onCloseModal,
        }),
        [
            categories,
            transactions,
            isLoading,
            filters,
            setFilters,
            user,
            isUserLoading,
            modal,
            isPending,
            onOpenEditModal,
            onOpenDeleteModal,
            onOpenCreateModal,
            onDeleteTransaction,
            onCloseModal,
        ],
    );

    return <TransactionContext value={value}>{children}</TransactionContext>;
}
