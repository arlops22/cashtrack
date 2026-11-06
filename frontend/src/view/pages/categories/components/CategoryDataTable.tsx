import { CircleX, Edit } from 'lucide-react';

import type { Category } from '../../../../app/entities/Category';

import { useCategory } from './CategoryContext/useCategory';

import DataTable from '../../../components/DataTable';
import Button from '../../../components/Button';
import EmptyList from '../../../components/EmptyList';

export default function CategoryDataTable() {
    const { categories, isLoadingCategories, onOpenDeleteModal, onOpenEditModal, onOpenCreateModal } = useCategory();

    const columns = [
        {
            id: 'name',
            header: 'Name',
            cell: (row: Category) => row.name,
        },
        {
            id: 'action',
            header: 'Actions',
            className: 'w-[100px]',
            cell: (row: Category) => (
                <div className="flex items-center gap-2">
                    <Button onClick={() => onOpenEditModal(row)} size="icon" variant="ghost" color="secondary">
                        <Edit />
                    </Button>
                    <Button onClick={() => onOpenDeleteModal(row)} size="icon" color="error" variant="ghost">
                        <CircleX />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            isLoading={isLoadingCategories}
            columns={columns}
            data={categories}
            emptyComponent={
                <EmptyList
                    title="No categories yet"
                    description="Create your first category to start organizing your expenses"
                    actionLabel="Add category"
                    onClickAction={onOpenCreateModal}
                />
            }
        />
    );
}
