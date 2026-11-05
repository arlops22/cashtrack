import type { Category } from '../../../../../app/entities/Category';

import { useCategoryFormController } from './useCategoryFormController';

import { Modal } from '../../../../components/ui/Modal';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

type TProps = {
    category?: Category;
    isOpen: boolean;
    onClose: () => void;
};

export default function CategoryModal(props: TProps) {
    const { category, isOpen, onClose } = props;

    const { handleSubmit, register, errors } = useCategoryFormController();

    return (
        <Modal open={isOpen} onClose={onClose} title={category ? 'Edit category' : 'New category'}>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Category name"
                    className="mb-8"
                    error={errors.name?.message}
                    {...register('name')}
                />
                <Button className="w-full" type="submit">
                    Save category
                </Button>
            </form>
        </Modal>
    );
}
