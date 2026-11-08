import { useCategory } from '../CategoryContext/useCategory';

import ConfirmModal from '../../../../components/ConfirmModal';

export default function DeleteCategoryModal() {
    const { modal, onCloseModal, onDeleteCategory, isLoadingDelete } = useCategory();

    return (
        <ConfirmModal
            isOpen={modal.type === 'delete'}
            onClose={onCloseModal}
            onConfirm={onDeleteCategory}
            isLoading={isLoadingDelete}
            title={`Are you sure that you want to delete ${modal.category?.name} category?`}
        />
    );
}
