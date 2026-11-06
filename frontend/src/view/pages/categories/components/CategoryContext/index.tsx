import { createContext, useCallback, useMemo, useState } from 'react';

import type { Category } from '../../../../../app/entities/Category';
import { useCategories, useDeleteCategory } from '../../../../../app/hooks/categories';

type ModalState = {
    type: 'closed' | 'create' | 'edit' | 'delete';
    category?: Category;
};

export interface CategoryContextProps {
    categories: Category[];
    modal: ModalState;
    isLoadingCategories: boolean;
    isLoadingDelete: boolean;
    onOpenEditModal: (category: Category) => void;
    onOpenDeleteModal: (category: Category) => void;
    onOpenCreateModal: () => void;
    onDeleteCategory: () => void;
    onCloseModal: () => void;
}

export const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [modal, setModal] = useState<ModalState>({ type: 'closed' });

    const { categories, isLoading } = useCategories();
    const { mutate: deleteCategory, isPending } = useDeleteCategory();

    const onOpenEditModal = useCallback((category: Category) => {
        setModal({ type: 'edit', category });
    }, []);

    const onOpenDeleteModal = useCallback((category: Category) => {
        setModal({ type: 'delete', category });
    }, []);

    const onOpenCreateModal = useCallback(() => {
        setModal({ type: 'create' });
    }, []);

    const onCloseModal = useCallback(() => {
        setModal(oldState => ({ ...oldState, type: 'closed' }));
    }, []);

    const onDeleteCategory = useCallback(() => {
        if (!modal.category) return;

        deleteCategory(modal.category.id, {
            onSuccess: onCloseModal,
        });
    }, [modal, deleteCategory, onCloseModal]);

    const value = useMemo<CategoryContextProps>(
        () => ({
            categories,
            modal,
            isLoadingCategories: isLoading,
            isLoadingDelete: isPending,
            onOpenEditModal,
            onOpenDeleteModal,
            onOpenCreateModal,
            onDeleteCategory,
            onCloseModal,
        }),
        [
            categories,
            modal,
            isLoading,
            isPending,
            onOpenEditModal,
            onOpenDeleteModal,
            onOpenCreateModal,
            onDeleteCategory,
            onCloseModal,
        ],
    );

    return <CategoryContext value={value}>{children}</CategoryContext>;
}
