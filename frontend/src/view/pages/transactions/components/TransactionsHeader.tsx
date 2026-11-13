import { Filter, Plus } from 'lucide-react';

import { useTransaction } from './TransactionContext/useTransaction';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

export default function TransactionsHeader() {
    const { onOpenCreateModal, setIsFilterModalOpen } = useTransaction();

    return (
        <Header
            title="Transactions"
            actionComponent={
                <div className="flex items-center gap-4">
                    <Button onClick={() => setIsFilterModalOpen(true)} size="md" variant="outlined" color="secondary">
                        <Filter size={14} />
                        <span>Filters</span>
                    </Button>
                    <Button className="hidden sm:flex" onClick={onOpenCreateModal} size="md">
                        <Plus size={15} />
                        <span>Add transaction</span>
                    </Button>
                    <Button
                        className="absolute bottom-6 right-6 flex sm:hidden"
                        onClick={onOpenCreateModal}
                        size="icon-lg"
                    >
                        <Plus size={15} />
                    </Button>
                </div>
            }
        />
    );
}
