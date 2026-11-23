import { Controller } from 'react-hook-form';

import { useCategoryFormController } from './useCategoryFormController';
import { useCategory } from '../../CategoryContext/useCategory';

import Modal from '../../../../../components/Modal';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ColorPickerField from '../../../../../components/ColorPickerField';

export default function CategoryModal() {
    const { modal, onCloseModal } = useCategory();
    const { handleSubmit, register, errors, isPending, control } = useCategoryFormController();

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
                    className="mb-4"
                    error={errors.name?.message}
                    {...register('name')}
                />

                <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                        <ColorPickerField className="mb-8" value={field.value} onChange={field.onChange} />
                    )}
                />
                <Button isLoading={isPending} className="w-full" type="submit">
                    Save category
                </Button>
            </form>
        </Modal>
    );
}
