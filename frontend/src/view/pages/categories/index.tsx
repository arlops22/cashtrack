import { useState } from 'react';
import { CircleX, Edit, Plus } from 'lucide-react';

import type { Category } from '../../../app/entities/Category';

import Button from '../../components/Button';
import Header from '../../components/Header';
import DataTable from '../../components/DataTable';
import EmptyList from '../../components/EmptyList';
import CategoryModal from './components/CategoryModal';
import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '../../../app/services/categoriesService';
import ConfirmModal from '../../components/ConfirmModal';

export default function Categories() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [categoryForEdit, setCategoryForEdit] = useState<Category | undefined>();

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesService.get(),
    });

    const columns = [
        {
            header: 'Name',
            cell: (row: Category) => row.name,
            className: 'w-9/10',
        },
        {
            header: 'Actions',
            cell: (row: Category) => (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => {
                            setCategoryForEdit(row);
                            setIsModalOpen(true);
                        }}
                        size="icon"
                        variant="ghost"
                        color="secondary"
                    >
                        <Edit />
                    </Button>
                    <Button
                        onClick={() => {
                            setCategoryForEdit(row);
                            setIsConfirmModalOpen(true);
                        }}
                        size="icon"
                        color="error"
                        variant="ghost"
                    >
                        <CircleX />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Header
                title="Categories"
                actionComponent={
                    <Button onClick={() => setIsModalOpen(true)} size="md">
                        <Plus size={15} />
                        <span>Add category</span>
                    </Button>
                }
            />
            <div className="flex flex-1 flex-col p-4">
                <DataTable
                    columns={columns}
                    data={categories || []}
                    emptyComponent={
                        <EmptyList
                            title="No categories yet"
                            description="Create your first category to start organizing your expenses"
                            actionLabel="Add category"
                            onClickAction={() => setIsModalOpen(true)}
                        />
                    }
                />
            </div>

            <CategoryModal
                category={categoryForEdit}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(prevState => !prevState);
                    setCategoryForEdit(undefined);
                }}
            />

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => {
                    setIsConfirmModalOpen(prevState => !prevState);
                    setCategoryForEdit(undefined);
                }}
                onConfirm={() => {}}
                isLoading={false}
                title="Are you sure that you want to delete this category?"
            />
        </>
    );
}
