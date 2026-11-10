import { TransactionProvider } from './components/TransactionContext';

import TransactionsHeader from './components/TransactionsHeader';
import TransactionsFilters from './components/TransactionsFilters';
import TransactionsDataTable from './components/TransactionsDataTable';
import TransactionModal from './components/modals/TransactionModal';
import TransactionsSummaryCard from './components/TransactionsSummaryCard';

export default function Transactions() {
    return (
        <TransactionProvider>
            <TransactionsHeader />
            <div className="grid grid-cols-[1fr_minmax(0,350px)] items-start gap-4 p-4">
                <div className="bg-white border rounded-md p-4">
                    <TransactionsFilters />
                    <TransactionsDataTable />
                </div>
                <TransactionsSummaryCard />
            </div>
            <TransactionModal />
        </TransactionProvider>
    );
}
