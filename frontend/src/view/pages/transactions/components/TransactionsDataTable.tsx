import { CircleX, Edit, EllipsisVertical } from 'lucide-react';

import type { Transaction } from '../../../../app/entities/Transaction';
import { useTransaction } from './TransactionContext/useTransaction';
import { formatCurrency, formatDate } from '../../../../app/utils';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../../components/ui/DropDownMenu';
import { Badge } from '../../../components/ui/Badge';
import DataTable from '../../../components/DataTable';
import EmptyList from '../../../components/EmptyList';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';

export default function TransactionsDataTable() {
    const { transactionsData, isLoadingTransactions, onOpenCreateModal, onOpenDeleteModal, onOpenEditModal } =
        useTransaction();

    const columns = [
        {
            id: 'name',
            header: 'Name',
            className: 'lg:w-[300px]',
            cell: (row: Transaction) => (
                <div>
                    <Typography
                        variant="body-md"
                        className="font-medium text-ellipsis overflow-hidden"
                        color="gray-900"
                    >
                        {row.name}
                    </Typography>
                    <div className="flex items-center gap-2 lg:hidden mt-2">
                        <Badge className="bg-teal-0 text-primary">{row.category ? row.category.name : '-'}</Badge>
                        <Badge variant="ghost">{row.method}</Badge>
                    </div>
                </div>
            ),
        },
        {
            id: 'category',
            className: 'hidden lg:table-cell lg:w-[150px]',
            header: 'Category',
            cell: (row: Transaction) => (
                <Badge style={{ backgroundColor: row.category?.color }} className="text-white">
                    {row.category ? row.category.name : '-'}
                </Badge>
            ),
        },
        {
            id: 'payment',
            header: 'Payment Method',
            className: 'hidden lg:table-cell lg:w-[150px]',
            cell: (row: Transaction) => <Badge variant="ghost">{row.method}</Badge>,
        },
        {
            id: 'amount',
            header: 'Amount',
            className: 'lg:w-[100px]',
            cell: (row: Transaction) => (
                <div className="flex items-center justify-end gap-2">
                    <Typography color={row.type === 'INCOME' ? 'primary' : 'destructive'}>
                        {formatCurrency(row.type === 'INCOME' ? row.amount : row.amount * -1, 'exceptZero')}
                    </Typography>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" color="secondary">
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) rounded-lg"
                            side="bottom"
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuItem onClick={() => onOpenEditModal(row)}>
                                <Edit />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-800" onClick={() => onOpenDeleteModal(row)}>
                                <CircleX />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ];

    if (!transactionsData || !transactionsData.transactionsByDay.length)
        return (
            <EmptyList
                title="No transactions found"
                description="Create your first transaction to start organizing your monthly expenses"
                actionLabel="Add transaction"
                onClickAction={onOpenCreateModal}
            />
        );

    return (
        <>
            {transactionsData?.transactionsByDay.map(data => (
                <div className="mt-4" key={`transactions-from-${data.date}`}>
                    <div className="flex items-center justify-between bg-gray-100 p-2">
                        <Typography variant="body-md" color="gray-700" className="font-medium">
                            {formatDate(new Date(data.date), 'D MMMM YYYY')}
                        </Typography>
                        <Typography variant="body-md" color="gray-900">
                            {formatCurrency(data.dayBalance)}
                        </Typography>
                    </div>
                    <DataTable
                        className="table-fixed"
                        hasHeader={false}
                        isLoading={isLoadingTransactions}
                        columns={columns}
                        data={data.transactions}
                    />
                </div>
            ))}
        </>
    );
}
