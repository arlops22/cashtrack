import { Controller } from 'react-hook-form';

import { ALL } from '../../../../../../app/config/constants';
import { useTransaction } from '../../TransactionContext/useTransaction';
import { useFilterTransactionFormController } from './useFilterTransactionFormController';

import Modal from '../../../../../components/Modal';
import Select from '../../../../../components/Select';
import Button from '../../../../../components/Button';

export default function FilterTransactionsModal() {
    const { categoryOptions, isFilterModalOpen, setIsFilterModalOpen } = useTransaction();
    const { control, handleSubmit, reset } = useFilterTransactionFormController();

    const yearOptions = Array.from({ length: 6 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { value: year, label: year.toString() };
    });

    return (
        <Modal open={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} title="Filter">
            <form onSubmit={handleSubmit}>
                <Controller
                    control={control}
                    name="year"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                        <Select
                            className="mb-4"
                            placeholder="Year"
                            options={yearOptions}
                            value={value?.toString()}
                            onChange={selected => onChange(Number(selected))}
                            {...fieldProps}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="category"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                        <Select
                            className="mb-4"
                            placeholder="By Category"
                            options={[
                                {
                                    value: ALL,
                                    label: 'All',
                                },
                                ...categoryOptions,
                            ]}
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
                            placeholder="By Payment Method"
                            className="mb-8"
                            options={[
                                {
                                    value: ALL,
                                    label: 'All',
                                },
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
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => reset({ year: new Date().getFullYear(), method: ALL, category: ALL })}
                        variant="outlined"
                        color="secondary"
                        className="w-full"
                        type="button"
                    >
                        Reset
                    </Button>
                    <Button className="w-full" type="submit">
                        Filtrar
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
