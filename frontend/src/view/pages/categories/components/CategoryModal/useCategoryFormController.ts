import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    name: z.string().trim().min(1, 'Enter a valid category name'),
});

type CategorySchema = z.infer<typeof schema>;

export function useCategoryFormController() {
    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
    } = useForm<CategorySchema>({
        resolver: zodResolver(schema),
    });

    const handleSubmit = hookFormSubmit(() => {});

    return { register, errors, handleSubmit };
}
