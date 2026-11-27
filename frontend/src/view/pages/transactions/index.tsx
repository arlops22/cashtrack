import { TransactionProvider } from './components/TransactionContext';

import TransactionsHeader from './components/TransactionsHeader';
import TransactionModal from './components/modals/TransactionModal';
import DeleteTransactionModal from './components/modals/DeleteTransactionModal';
import FilterTransactionsModal from './components/modals/FilterTransactionsModal';
import TransactionsContent from './components/TransactionsContent';

export default function Transactions() {
    return (
        <TransactionProvider>
            <TransactionsHeader />
            <TransactionsContent />

            <TransactionModal />
            <DeleteTransactionModal />
            <FilterTransactionsModal />
        </TransactionProvider>
    );
}
