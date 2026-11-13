import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import type { Transaction } from '../../../../../app/entities/Transaction';
import type { BankAccount } from '../../../../../app/entities/BankAccount';
import { useAuth } from '../../../../../app/hooks/useAuth';
import { useDeleteTransaction, useTransactions } from '../../../../../app/hooks/transactions';
import { useCategories } from '../../../../../app/hooks/categories';

type ModalState = {
    type: 'closed' | 'create' | 'edit' | 'delete';
    transaction?: Transaction;
};

type FilterState = {
    account: string;
    type: Transaction['type'] | 'All';
    category?: number;
    method?: Transaction['method'];
    month: number;
    year: number;
};

export interface TransactionContextProps {
    filters: FilterState;
    categoryOptions: { value: number; label: string }[];
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    transactions: Transaction[];
    accounts: BankAccount[];
    modal: ModalState;
    isFilterModalOpen: boolean;
    setIsFilterModalOpen: (isOpen: boolean) => void;
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
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        account: user?.bankAccounts[0].id.toString() ?? '',
        type: 'All',
        category: undefined,
        method: undefined,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const { transactions, refetchTransactions, isLoading } = useTransactions({
        bankAccountId: Number(filters.account),
        type: filters.type !== 'All' ? filters.type : undefined,
        category: filters.category,
        method: filters.method,
        month: filters.month,
        year: filters.year,
    });

    const { categories, isLoading: isLoadingCategories } = useCategories();

    const categoryOptions = useMemo(
        () => categories.map(category => ({ value: category.id, label: category.name })),
        [categories],
    );

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
            filters,
            categoryOptions,
            setFilters,
            isFilterModalOpen,
            setIsFilterModalOpen,
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
            categoryOptions,
            transactions,
            isLoading,
            filters,
            setFilters,
            isFilterModalOpen,
            setIsFilterModalOpen,
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
