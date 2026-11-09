import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTransaction } from '../../TransactionContext/useTransaction';
import { useCreateTransaction, useUpdateTransaction } from '../../../../../../app/hooks/transactions';

const schema = z.object({
    category: z.number().nonnegative().nullable(),
    name: z.string().nonempty('Must not be empty'),
    amount: z.number().nonnegative(),
    createdAt: z.iso.datetime(),
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
        values: {
            category: modal.transaction?.category?.id ?? null,
            name: modal.transaction?.name ?? '',
            amount: modal.transaction?.amount ?? 0,
            createdAt: modal.transaction?.createdAt.toString() ?? '',
            type: modal.transaction?.type ?? 'EXPENSE',
            method: modal.transaction?.method ?? 'CREDIT',
        },
        resolver: zodResolver(schema),
    });

    const { mutate: createTransaction, isPending: isLoadingCreate } = useCreateTransaction();

    const { mutate: updateTransaction, isPending: isLoadingUpdate } = useUpdateTransaction();

    const handleSubmit = hookFormSubmit(data => {
        if (modal.transaction) {
            updateTransaction(
                {
                    id: modal.transaction.id,
                    bankAccountId: Number(filters.account),
                    categoryId: data.category,
                    ...data,
                },
                { onSuccess: onCloseModal },
            );
        } else {
            createTransaction(
                {
                    bankAccountId: Number(filters.account),
                    categoryId: data.category,
                    ...data,
                },
                { onSuccess: onCloseModal },
            );
        }
    });

    return { register, errors, handleSubmit, isPending: isLoadingCreate || isLoadingUpdate, control };
}
