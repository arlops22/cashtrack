import { useBankAccount } from './BankAccountContext/useBankAccount';

import { Skeleton } from '../../../components/ui/Skeleton';
import EmptyList from '../../../components/EmptyList';
import BankAccountCard from './BankAccountCard';

export default function BankAccountList() {
    const { bankAccounts, isLoadingAccounts, onOpenCreateModal, onOpenDeleteModal, onOpenEditModal } = useBankAccount();

    const wrapperClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3';

    const emptyData = (
        <EmptyList
            title="No accounts yet"
            description="Create your first bank account to start organizing your expenses"
            actionLabel="Add account"
            onClickAction={onOpenCreateModal}
        />
    );

    if (isLoadingAccounts)
        return (
            <div className={wrapperClass}>
                {new Array(8).fill('').map((_, index) => (
                    <Skeleton className="h-56" key={`loader-${index}`} />
                ))}
            </div>
        );

    return bankAccounts.length ? (
        <div className={wrapperClass}>
            {bankAccounts.map(account => (
                <BankAccountCard
                    key={account.id}
                    accountName={account.name}
                    balance={account.currentBalance}
                    type={account.type}
                    color={account.color}
                    onDelete={() => onOpenDeleteModal(account)}
                    onEdit={() => onOpenEditModal(account)}
                />
            ))}
        </div>
    ) : (
        emptyData
    );
}
