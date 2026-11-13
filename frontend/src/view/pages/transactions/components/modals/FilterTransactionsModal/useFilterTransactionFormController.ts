import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ALL } from '../../../../../../app/config/constants';
import { useTransaction } from '../../TransactionContext/useTransaction';

const schema = z.object({
    year: z.number({ error: 'Year must not be empty' }).int().min(2000, 'Invalid year'),
    method: z
        .union([z.enum(['CREDIT', 'DEBIT', 'PIX', 'CASH']), z.literal(ALL)])
        .transform(value => (value === ALL ? undefined : value)),
    category: z.string().transform(value => (value === ALL ? undefined : Number(value))),
});

type FilterInput = z.input<typeof schema>;
type FilterOutput = z.output<typeof schema>;

export function useFilterTransactionFormController() {
    const { filters, setFilters, setIsFilterModalOpen } = useTransaction();

    const {
        handleSubmit: hookFormSubmit,
        control,
        reset,
    } = useForm<FilterInput, unknown, FilterOutput>({
        defaultValues: {
            year: filters.year,
            method: filters.method ?? ALL,
            category: filters.category ? String(filters.category) : ALL,
        },
        resolver: zodResolver(schema),
    });

    const handleSubmit = hookFormSubmit(data => {
        setFilters(oldFilters => ({
            ...oldFilters,
            ...data,
        }));
        setIsFilterModalOpen(false);
    });

    return { control, handleSubmit, reset };
}
