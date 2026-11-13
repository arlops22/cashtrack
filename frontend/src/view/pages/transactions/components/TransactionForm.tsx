import { NumericFormat } from 'react-number-format';
import { Controller } from 'react-hook-form';

import type { Transaction } from '../../../../app/entities/Transaction';
import { useTransaction } from './TransactionContext/useTransaction';
import { useTransactionFormController } from './modals/TransactionModal/useTransactionFormController';

import DatePickerField from '../../../components/DatePickerField';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

type TProps = {
    transaction?: Transaction;
    onSuccess: () => void;
};

export default function TransactionForm({ transaction, onSuccess }: TProps) {
    const { categoryOptions } = useTransaction();
    const { handleSubmit, register, errors, isPending, control } = useTransactionFormController({
        transaction,
        onSuccess,
    });

    return (
        <form onSubmit={handleSubmit}>
            <Input type="text" placeholder="Name" className="mb-4" error={errors.name?.message} {...register('name')} />
            <Controller
                name="amount"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <NumericFormat
                        className="mb-4"
                        placeholder="Amount"
                        customInput={Input}
                        prefix="R$ "
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        onValueChange={values => onChange(values.floatValue)}
                        value={value ?? ''}
                        error={errors.amount?.message}
                    />
                )}
            />
            <div className="flex items-start gap-4 mb-4">
                <Controller
                    control={control}
                    name="type"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                        <Select
                            placeholder="Type"
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
                            error={errors.category?.message}
                            options={categoryOptions}
                            onChange={onChange}
                            value={value?.toString()}
                            {...fieldProps}
                        />
                    )}
                />
            </div>
            <div className="flex items-start gap-4 mb-8">
                <Controller
                    control={control}
                    name="method"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                        <Select
                            placeholder="Payment Method"
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
                            error={errors.createdAt?.message}
                            onChange={onChange}
                            value={value}
                            {...fieldProps}
                        />
                    )}
                />
            </div>

            <Button isLoading={isPending} className="w-full" type="submit">
                Save transaction
            </Button>
        </form>
    );
}
