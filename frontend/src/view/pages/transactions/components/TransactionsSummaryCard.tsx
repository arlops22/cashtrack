import { useTransaction } from './TransactionContext/useTransaction';
import { formatCurrency } from '../../../../app/utils';
import { MONTHS } from '../../../../app/config/constants';

import Typography from '../../../components/Typography';

export default function TransactionsSummaryCard() {
    const { transactionsData, filters, accounts } = useTransaction();

    return (
        <div className="order-first w-full lg:order-last bg-white border rounded-md p-4">
            <Typography variant="body-lg" className="font-bold mb-6">
                Summary
            </Typography>
            <div className="flex items-center justify-between mb-4">
                <Typography variant="body-sm" color="gray-600">
                    Date:
                </Typography>
                <Typography variant="body-md" className="font-medium">
                    {MONTHS[filters.month]}, {filters.year}
                </Typography>
            </div>
            <div className="flex items-center justify-between mb-4">
                <Typography variant="body-sm" color="gray-600">
                    Account balance:
                </Typography>
                <Typography variant="body-md" className="font-medium">
                    {formatCurrency(
                        accounts.find(account => account.id === Number(filters.account))?.currentBalance || 0,
                    )}
                </Typography>
            </div>
            <div className="flex items-center justify-between mb-4">
                <Typography variant="body-sm" color="gray-600">
                    Total transactions:
                </Typography>
                <Typography variant="body-md" className="font-medium">
                    {transactionsData?.transactionCount}
                </Typography>
            </div>
            <div className="flex items-center justify-between mb-4">
                <Typography variant="body-sm" color="gray-600">
                    Total Income:
                </Typography>
                <Typography variant="body-md" className="font-medium text-primary">
                    {formatCurrency(transactionsData?.totalIncome || 0)}
                </Typography>
            </div>
            <div className="flex items-center justify-between mb-4">
                <Typography variant="body-sm" color="gray-600">
                    Total Expense:
                </Typography>
                <Typography variant="body-md" className="font-medium text-destructive">
                    {formatCurrency(transactionsData?.totalExpense || 0)}
                </Typography>
            </div>
            <div className="flex items-center justify-between">
                <Typography variant="body-sm" color="gray-600">
                    Result:
                </Typography>
                <Typography variant="body-md" className="font-medium">
                    {formatCurrency(transactionsData?.periodBalance || 0)}
                </Typography>
            </div>
        </div>
    );
}
