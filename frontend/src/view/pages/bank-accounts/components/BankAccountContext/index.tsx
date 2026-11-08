import { createContext, useCallback, useMemo, useState } from 'react';

import type { BankAccount } from '../../../../../app/entities/BankAccount';
import { useAuth } from '../../../../../app/hooks/useAuth';
import { useDeleteBankAccount } from '../../../../../app/hooks/bank-accounts';

type ModalState = {
    type: 'closed' | 'create' | 'edit' | 'delete';
    account?: BankAccount;
};

export interface BankAccountContextProps {
    bankAccounts: BankAccount[];
    modal: ModalState;
    isLoadingAccounts: boolean;
    isLoadingDelete: boolean;
    onOpenEditModal: (account: BankAccount) => void;
    onOpenDeleteModal: (account: BankAccount) => void;
    onOpenCreateModal: () => void;
    onDeleteAccount: () => void;
    onCloseModal: () => void;
}

export const BankAccountContext = createContext<BankAccountContextProps | undefined>(undefined);

export function BankAccountProvider({ children }: { children: React.ReactNode }) {
    const [modal, setModal] = useState<ModalState>({ type: 'closed' });

    const { user, isUserLoading } = useAuth();
    const { mutate: deleteBankAccount, isPending } = useDeleteBankAccount();

    const onOpenEditModal = useCallback((account: BankAccount) => {
        setModal({ type: 'edit', account });
    }, []);

    const onOpenDeleteModal = useCallback((account: BankAccount) => {
        setModal({ type: 'delete', account });
    }, []);

    const onOpenCreateModal = useCallback(() => {
        setModal({ type: 'create' });
    }, []);

    const onCloseModal = useCallback(() => {
        setModal(oldState => ({ ...oldState, type: 'closed' }));
    }, []);

    const onDeleteAccount = useCallback(() => {
        if (!modal.account) return;

        deleteBankAccount(modal.account.id, {
            onSuccess: onCloseModal,
        });
    }, [modal, deleteBankAccount, onCloseModal]);

    const value = useMemo<BankAccountContextProps>(
        () => ({
            bankAccounts: user?.bankAccounts ?? [],
            isLoadingAccounts: isUserLoading,
            modal,
            isLoadingDelete: isPending,
            onOpenEditModal,
            onOpenDeleteModal,
            onOpenCreateModal,
            onDeleteAccount,
            onCloseModal,
        }),
        [
            user,
            isUserLoading,
            modal,
            isPending,
            onOpenEditModal,
            onOpenDeleteModal,
            onOpenCreateModal,
            onDeleteAccount,
            onCloseModal,
        ],
    );

    return <BankAccountContext value={value}>{children}</BankAccountContext>;
}
