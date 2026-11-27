import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useTransaction } from './TransactionContext/useTransaction';

import EmptyList from '../../../components/EmptyList';
import Button from '../../../components/Button';
import TransactionsDataTable from './TransactionsDataTable';
import TransactionsFilters from './TransactionsFilters';
import TransactionsSummaryCard from './TransactionsSummaryCard';

export default function TransactionsContent() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { accounts } = useTransaction();

    return accounts.length ? (
        <div className="grid grid-cols-1 items-start gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px]">
            <div className="bg-white border rounded-md p-4">
                <TransactionsFilters />
                <TransactionsDataTable />
            </div>
            <TransactionsSummaryCard />
        </div>
    ) : (
        <div className="p-4">
            <EmptyList
                title={t('transactions.emptyAccount.title')}
                description={t('transactions.emptyAccount.description')}
                actionComponent={
                    <div className="flex items-center gap-2">
                        <Button onClick={() => navigate('/bank-accounts')} size="md">
                            {t('transactions.emptyAccount.add')}
                        </Button>
                    </div>
                }
            />
        </div>
    );
}
