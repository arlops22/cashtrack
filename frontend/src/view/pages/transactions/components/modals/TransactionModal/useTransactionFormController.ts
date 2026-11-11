import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTransaction } from '../../TransactionContext/useTransaction';
import { useCreateTransaction, useUpdateTransaction } from '../../../../../../app/hooks/transactions';

const schema = z.object({
    category: z.string().nonempty('Must not be empty'),
    name: z.string().nonempty('Must not be empty'),
    amount: z.number().nonnegative(),
    createdAt: z.date(),
    type: z.enum(['INCOME', 'EXPENSE']),
    method: z.enum(['CREDIT', 'DEBIT', 'PIX', 'CASH']),
});

type CategorySchema = z.infer<typeof schema>;

export function useTransactionFormController() {
    const { modal, onCloseModal, filters } = useTransaction();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
    } = useForm<CategorySchema>({
        defaultValues: {
            category: modal.transaction?.category?.id.toString() ?? '',
            name: modal.transaction?.name ?? '',
            amount: modal.transaction?.amount ?? 0,
            createdAt: modal.transaction?.createdAt ?? new Date(),
            type: modal.transaction?.type ?? 'EXPENSE',
            method: modal.transaction?.method ?? 'CREDIT',
        },
        resolver: zodResolver(schema),
    });

    const { mutate: createTransaction, isPending: isLoadingCreate } = useCreateTransaction();

    const { mutate: updateTransaction, isPending: isLoadingUpdate } = useUpdateTransaction();

    const handleSubmit = hookFormSubmit(data => {
        const { category, ...params } = data;
        if (modal.transaction) {
            updateTransaction(
                {
                    ...params,
                    id: modal.transaction.id,
                    bankAccountId: Number(filters.account),
                    categoryId: Number(category),
                    createdAt: data.createdAt.toISOString(),
                },
                { onSuccess: onCloseModal },
            );
        } else {
            createTransaction(
                {
                    ...params,
                    bankAccountId: Number(filters.account),
                    categoryId: Number(category),
                    createdAt: data.createdAt.toISOString(),
                },
                { onSuccess: onCloseModal },
            );
        }
    });

    return { register, errors, handleSubmit, isPending: isLoadingCreate || isLoadingUpdate, control };
}
