import { Filter, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useTransaction } from './TransactionContext/useTransaction';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

export default function TransactionsHeader() {
    const { t } = useTranslation();
    const { accounts, onOpenCreateModal, setIsFilterModalOpen } = useTransaction();

    return (
        <Header
            title={t('transactions.title')}
            actionComponent={
                !!accounts.length && (
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => setIsFilterModalOpen(true)}
                            size="md"
                            variant="outlined"
                            color="secondary"
                        >
                            <Filter size={14} />
                            <span>{t('common.filters')}</span>
                        </Button>
                        <Button className="hidden sm:flex" onClick={onOpenCreateModal} size="md">
                            <Plus size={15} />
                            <span>{t('transactions.add')}</span>
                        </Button>
                        <Button
                            className="absolute bottom-6 right-6 flex z-50 sm:hidden"
                            onClick={onOpenCreateModal}
                            size="icon-lg"
                        >
                            <Plus size={15} />
                        </Button>
                    </div>
                )
            }
        />
    );
}
