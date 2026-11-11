import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { useTransaction } from '../../TransactionContext/useTransaction';
import { useTransactionFormController } from './useTransactionFormController';

import { Modal } from '../../../../../components/ui/Modal';
import DatePickerField from '../../../../../components/DatePickerField';
import Input from '../../../../../components/Input';
import Select from '../../../../../components/Select';
import Button from '../../../../../components/Button';

export default function TransactionModal() {
    const { categories, modal, onCloseModal } = useTransaction();
    const { handleSubmit, register, errors, isPending, control } = useTransactionFormController();

    const categoryOptions = useMemo(
        () => [
            { value: '0', label: '' },
            ...categories.map(category => ({ value: category.id, label: category.name })),
        ],
        [categories],
    );

    return (
        <Modal
            open={modal.type === 'create' || modal.type === 'edit'}
            onClose={onCloseModal}
            title={modal.transaction ? 'Edit transaction' : 'New transaction'}
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
                    name="amount"
                    control={control}
                    render={({ field }) => (
                        <NumericFormat
                            className="mb-4"
                            placeholder="Amount"
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
                                    value: 'INCOME',
                                    label: 'Income',
                                },
                                {
                                    value: 'EXPENSE',
                                    label: 'Expense',
                                },
                            ]}
                            onChange={onChange}
                            value={value}
                            {...fieldProps}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="category"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                        <Select
                            placeholder="Category"
                            className="mb-4"
                            error={errors.category?.message}
                            options={categoryOptions}
                            onChange={onChange}
                            value={value?.toString()}
                            {...fieldProps}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="method"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                        <Select
                            placeholder="Payment Method"
                            className="mb-4"
                            error={errors.method?.message}
                            options={[
                                {
                                    value: 'CREDIT',
                                    label: 'Credit card',
                                },
                                {
                                    value: 'DEBIT',
                                    label: 'Debit card',
                                },
                                {
                                    value: 'PIX',
                                    label: 'Pix',
                                },
                                {
                                    value: 'CASH',
                                    label: 'Cash',
                                },
                            ]}
                            onChange={onChange}
                            value={value}
                            {...fieldProps}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="createdAt"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                        <DatePickerField
                            className="mb-8"
                            error={errors.createdAt?.message}
                            onChange={onChange}
                            value={value}
                            {...fieldProps}
                        />
                    )}
                />

                <Button isLoading={isPending} className="w-full" type="submit">
                    Save transaction
                </Button>
            </form>
        </Modal>
    );
}
