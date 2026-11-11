import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { Transaction } from '../../../../../../app/entities/Transaction';
import { useTransaction } from '../../TransactionContext/useTransaction';
import { useCreateTransaction, useUpdateTransaction } from '../../../../../../app/hooks/transactions';

const required = (field: string) => `${field} must not be empty`;

const schema = z.object({
    category: z.string().min(1, required('Category')),
    name: z.string().trim().min(1, required('Name')),
    amount: z.number({ error: required('Amount') }).positive('Amount must be greater than zero'),
    createdAt: z.date({ error: required('Date') }),
    type: z.enum(['INCOME', 'EXPENSE'], { error: required('Type') }),
    method: z.enum(['CREDIT', 'DEBIT', 'PIX', 'CASH'], { error: required('Payment method') }),
});

type CategorySchema = z.infer<typeof schema>;

interface Props {
    transaction?: Transaction;
    onSuccess: () => void;
}

export function useTransactionFormController(props: Props) {
    const { transaction, onSuccess } = props;
    const { filters } = useTransaction();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
    } = useForm<CategorySchema>({
        defaultValues: {
            category: transaction?.category?.id.toString() ?? '',
            name: transaction?.name ?? '',
            amount: transaction?.amount,
            createdAt: transaction ? new Date(transaction.createdAt) : undefined,
            type: transaction?.type,
            method: transaction?.method,
        },
        resolver: zodResolver(schema),
    });

    const { mutate: createTransaction, isPending: isLoadingCreate } = useCreateTransaction();

    const { mutate: updateTransaction, isPending: isLoadingUpdate } = useUpdateTransaction();

    const handleSubmit = hookFormSubmit(data => {
        const { category, ...params } = data;
        if (transaction) {
            updateTransaction(
                {
                    ...params,
                    id: transaction.id,
                    bankAccountId: Number(filters.account),
                    categoryId: Number(category),
                    createdAt: data.createdAt.toISOString(),
                },
                { onSuccess },
            );
        } else {
            createTransaction(
                {
                    ...params,
                    bankAccountId: Number(filters.account),
                    categoryId: Number(category),
                    createdAt: data.createdAt.toISOString(),
                },
                { onSuccess },
            );
        }
    });

    return { register, errors, handleSubmit, isPending: isLoadingCreate || isLoadingUpdate, control };
}
