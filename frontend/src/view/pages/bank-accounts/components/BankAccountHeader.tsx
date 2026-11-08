import { Plus } from 'lucide-react';

import { useBankAccount } from './BankAccountContext/useBankAccount';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

export default function BankAccountHeader() {
    const { onOpenCreateModal } = useBankAccount();

    return (
        <Header
            title="My Accounts"
            actionComponent={
                <Button onClick={onOpenCreateModal} size="md">
                    <Plus size={15} />
                    <span>Add account</span>
                </Button>
            }
        />
    );
}
