import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateCategory, useUpdateCategory } from '../../../../../../app/hooks/categories';
import { useCategory } from '../../CategoryContext/useCategory';

const schema = z.object({
    name: z.string().trim().min(1, 'Enter a valid category name'),
});

type CategorySchema = z.infer<typeof schema>;

export function useCategoryFormController() {
    const { modal, onCloseModal } = useCategory();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
    } = useForm<CategorySchema>({
        values: { name: modal.category?.name ?? '' },
        resolver: zodResolver(schema),
    });

    const { mutate: createCategory, isPending: isLoadingCreate } = useCreateCategory();

    const { mutate: updateCategory, isPending: isLoadingUpdate } = useUpdateCategory();

    const handleSubmit = hookFormSubmit(data => {
        if (modal.category) {
            updateCategory({ id: modal.category.id, ...data }, { onSuccess: onCloseModal });
        } else {
            createCategory(data, { onSuccess: onCloseModal });
        }
    });

    return { register, errors, handleSubmit, isPending: isLoadingCreate || isLoadingUpdate };
}
