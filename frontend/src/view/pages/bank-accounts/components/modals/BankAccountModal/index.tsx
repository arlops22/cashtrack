import { Controller } from 'react-hook-form';

import { useAccountFormController } from './useAccountFormController';
import { useBankAccount } from '../../BankAccountContext/useBankAccount';

import { Modal } from '../../../../../components/ui/Modal';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import Select from '../../../../../components/Select';

export default function BankAccountModal() {
    const { modal, onCloseModal } = useBankAccount();
    const { handleSubmit, register, errors, isPending, control } = useAccountFormController();

    return (
        <Modal
            open={modal.type === 'create' || modal.type === 'edit'}
            onClose={onCloseModal}
            title={modal.account ? 'Edit account' : 'New account'}
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
                    control={control}
                    name="type"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                        <Select
                            placeholder="Type"
                            className="mb-4"
                            error={errors.type?.message}
                            options={[
                                {
                                    value: 'CHECKING',
                                    label: 'Checking',
                                },
                                {
                                    value: 'INVESTMENT',
                                    label: 'Investiment',
                                },
                                {
                                    value: 'SAVING',
                                    label: 'Saving',
                                },
                            ]}
                            onChange={onChange}
                            value={value}
                            {...fieldProps}
                        />
                    )}
                />
                <Input
                    type="text"
                    placeholder="Initial balance"
                    className="mb-8"
                    error={errors.initialBalance?.message}
                    {...register('initialBalance')}
                />

                <Button isLoading={isPending} className="w-full" type="submit">
                    Save account
                </Button>
            </form>
        </Modal>
    );
}
