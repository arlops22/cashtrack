import { Filter, Plus } from 'lucide-react';

import { useTransaction } from './TransactionContext/useTransaction';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

export default function TransactionsHeader() {
    const { onOpenCreateModal } = useTransaction();

    return (
        <Header
            title="Transactions"
            actionComponent={
                <div className="flex items-center gap-4">
                    <Button size="md" variant="outlined" color="secondary">
                        <Filter size={14} />
                        <span>Filters</span>
                    </Button>
                    <Button onClick={onOpenCreateModal} size="md">
                        <Plus size={15} />
                        <span>Add transaction</span>
                    </Button>
                </div>
            }
        />
    );
}
