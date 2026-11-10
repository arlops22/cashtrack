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
    const { transactions, isLoadingTransactions, onOpenCreateModal, onOpenDeleteModal, onOpenEditModal } =
        useTransaction();

    const columns = [
        {
            id: 'name',
            header: 'Name',
            className: 'w-[340px]',
            cell: (row: Transaction) => (
                <div className="flex flex-col">
                    <Typography variant="body-lg" className="font-medium">
                        {row.name}
                    </Typography>
                    <Typography color="gray-800">{formatDate(row.createdAt)}</Typography>
                </div>
            ),
        },
        {
            id: 'type',
            header: 'Type',
            cell: (row: Transaction) => (
                <Badge
                    className={row.type === 'INCOME' ? 'bg-teal-100 text-primary' : ''}
                    variant={row.type === 'INCOME' ? 'outline' : 'destructive'}
                >
                    {row.type}
                </Badge>
            ),
        },
        {
            id: 'category',
            header: 'Category',
            cell: (row: Transaction) => (
                <Badge className="bg-warning-l/20 text-warning-m">{row.category ? row.category.name : '-'}</Badge>
            ),
        },
        {
            id: 'payment',
            header: 'Payment Method',
            cell: (row: Transaction) => <Badge variant="ghost">{row.method}</Badge>,
        },
        {
            id: 'amount',
            header: 'Amount',
            className: 'w-[100px]',
            cell: (row: Transaction) => (
                <div className="flex items-center gap-2">
                    <Typography color={row.type === 'INCOME' ? 'primary' : 'destructive'}>
                        {formatCurrency(row.amount, 'exceptZero')}
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

    return (
        <DataTable
            isLoading={isLoadingTransactions}
            columns={columns}
            data={transactions}
            emptyComponent={
                <EmptyList
                    title="No transactions found"
                    description="Create your first transaction to start organizing your monthly expenses"
                    actionLabel="Add transaction"
                    onClickAction={onOpenCreateModal}
                />
            }
        />
    );
}
