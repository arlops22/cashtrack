import type { Transaction } from '../../../../app/entities/Transaction';
import { formatCurrency } from '../../../../app/utils';
import { useTransaction } from './TransactionContext/useTransaction';

import Typography from '../../../components/Typography';

export default function TransactionsSummaryCard() {
    const { transactions, filters, accounts } = useTransaction();

    function getTotalsByType(transactions: Transaction[], type: Transaction['type']) {
        const total = transactions.reduce((sum: number, transaction: Transaction) => {
            if (transaction.type === type) {
                return (sum += transaction.amount);
            }

            return sum;
        }, 0);

        return formatCurrency(total, 'exceptZero');
    }

    function getResult(transactions: Transaction[]) {
        const total = transactions.reduce((sum: number, transaction: Transaction) => {
            return (sum += transaction.amount);
        }, 0);

        return formatCurrency(total, 'exceptZero');
    }

    return (
        <div className="bg-white border rounded-md p-4">
            <Typography variant="body-lg" className="font-bold mb-4">
                Summary
            </Typography>
            <div className="flex items-center justify-between mb-2">
                <Typography variant="body-sm" color="gray-600">
                    Account balance:
                </Typography>
                <Typography variant="body-md" className="font-medium">
                    {formatCurrency(
                        accounts.find(account => account.id === Number(filters.account))?.currentBalance || 0,
                    )}
                </Typography>
            </div>
            <div className="flex items-center justify-between mb-2">
                <Typography variant="body-sm" color="gray-600">
                    Total transactions:
                </Typography>
                <Typography variant="body-md" className="font-medium">
                    {transactions.length}
                </Typography>
            </div>
            <div className="flex items-center justify-between mb-2">
                <Typography variant="body-sm" color="gray-600">
                    Total Income:
                </Typography>
                <Typography variant="body-md" className="font-medium text-primary">
                    {getTotalsByType(transactions, 'INCOME')}
                </Typography>
            </div>
            <div className="flex items-center justify-between mb-2">
                <Typography variant="body-sm" color="gray-600">
                    Total Expense:
                </Typography>
                <Typography variant="body-md" className="font-medium text-destructive">
                    {getTotalsByType(transactions, 'EXPENSE')}
                </Typography>
            </div>
            <div className="flex items-center justify-between mb-2">
                <Typography variant="body-sm" color="gray-600">
                    Result:
                </Typography>
                <Typography variant="body-md" className="font-medium">
                    {getResult(transactions)}
                </Typography>
            </div>
        </div>
    );
}
