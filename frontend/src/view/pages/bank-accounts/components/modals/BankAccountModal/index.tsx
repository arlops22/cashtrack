import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { useAccountFormController } from './useAccountFormController';
import { useBankAccount } from '../../BankAccountContext/useBankAccount';

import Modal from '../../../../../components/Modal';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import Select from '../../../../../components/Select';
import ColorPickerField from '../../../../../components/ColorPickerField';

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

                {!modal.account && (
                    <Controller
                        name="initialBalance"
                        control={control}
                        render={({ field }) => (
                            <NumericFormat
                                className="mb-4"
                                placeholder="Initial balance"
                                customInput={Input}
                                value={field.value}
                                onValueChange={values => field.onChange(values.floatValue)}
                                prefix="R$ "
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale
                                allowNegative={false}
                            />
                        )}
                    />
                )}

                <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                        <ColorPickerField className="mb-8" value={field.value} onChange={field.onChange} />
                    )}
                />

                <Button isLoading={isPending} className="w-full" type="submit">
                    Save account
                </Button>
            </form>
        </Modal>
    );
}
