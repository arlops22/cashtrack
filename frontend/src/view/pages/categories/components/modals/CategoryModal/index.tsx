import { useCategoryFormController } from './useCategoryFormController';
import { useCategory } from '../../CategoryContext/useCategory';

import { Modal } from '../../../../../components/ui/Modal';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';

export default function CategoryModal() {
    const { modal, onCloseModal } = useCategory();
    const { handleSubmit, register, errors, isPending } = useCategoryFormController();

    return (
        <Modal
            open={modal.type === 'create' || modal.type === 'edit'}
            onClose={onCloseModal}
            title={modal.category ? 'Edit category' : 'New category'}
        >
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Name"
                    className="mb-8"
                    error={errors.name?.message}
                    {...register('name')}
                />
                <Button isLoading={isPending} className="w-full" type="submit">
                    Save category
                </Button>
            </form>
        </Modal>
    );
}
