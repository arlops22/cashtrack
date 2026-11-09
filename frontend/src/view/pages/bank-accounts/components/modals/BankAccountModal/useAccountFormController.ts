import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useBankAccount } from '../../BankAccountContext/useBankAccount';
import { useCreateBankAccount, useUpdateBankAccount } from '../../../../../../app/hooks/bank-accounts';
import { BankAccountTypeEnum } from '../../../../../../app/entities/BankAccount';

const schema = z.object({
    name: z.string().trim().min(1, 'Enter a valid account name'),
    initialBalance: z.number().nonnegative(),
    color: z.string().regex(/^#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, 'Must be a valid hex color (e.g. #FF5733)'),
    type: z.enum(Object.values(BankAccountTypeEnum)),
});

type CategorySchema = z.infer<typeof schema>;

export function useAccountFormController() {
    const { modal, onCloseModal } = useBankAccount();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
    } = useForm<CategorySchema>({
        values: {
            name: modal.account?.name ?? '',
            initialBalance: modal.account?.initialBalance ?? 0,
            color: modal.account?.color ?? '#000',
            type: modal.account?.type ?? 'CHECKING',
        },
        resolver: zodResolver(schema),
    });

    const { mutate: createBankAccount, isPending: isLoadingCreate } = useCreateBankAccount();

    const { mutate: updateBankAccount, isPending: isLoadingUpdate } = useUpdateBankAccount();

    const handleSubmit = hookFormSubmit(data => {
        if (modal.account) {
            updateBankAccount({ id: modal.account.id, ...data }, { onSuccess: onCloseModal });
        } else {
            createBankAccount(data, { onSuccess: onCloseModal });
        }
    });

    return { register, errors, handleSubmit, isPending: isLoadingCreate || isLoadingUpdate, control };
}
