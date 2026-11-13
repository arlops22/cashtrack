import { TransactionProvider } from './components/TransactionContext';

import TransactionsHeader from './components/TransactionsHeader';
import TransactionsFilters from './components/TransactionsFilters';
import TransactionsDataTable from './components/TransactionsDataTable';
import TransactionModal from './components/modals/TransactionModal';
import TransactionsSummaryCard from './components/TransactionsSummaryCard';
import DeleteTransactionModal from './components/modals/DeleteTransactionModal';
import FilterTransactionsModal from './components/modals/FilterTransactionsModal';

export default function Transactions() {
    return (
        <TransactionProvider>
            <TransactionsHeader />
            <div className="grid grid-cols-1 items-start gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px]">
                <div className="bg-white border rounded-md p-4">
                    <TransactionsFilters />
                    <TransactionsDataTable />
                </div>
                <TransactionsSummaryCard />
            </div>
            <TransactionModal />
            <DeleteTransactionModal />
            <FilterTransactionsModal />
        </TransactionProvider>
    );
}
