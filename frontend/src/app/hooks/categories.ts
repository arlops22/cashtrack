import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { categoriesService } from '../services/categoriesService';
import toast from 'react-hot-toast';

const CATEGORY_KEY = 'categories';

export function useCategories() {
    const { data, isLoading } = useQuery({
        queryKey: [CATEGORY_KEY],
        queryFn: categoriesService.get,
    });

    return { categories: data ?? [], isLoading };
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoriesService.create,
        onSuccess: () => {
            toast.success('Category successfuly created!');
            return queryClient.invalidateQueries({ queryKey: [CATEGORY_KEY] });
        },
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoriesService.update,
        onSuccess: () => {
            toast.success('Category successfuly updated!');
            return queryClient.invalidateQueries({ queryKey: [CATEGORY_KEY] });
        },
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoriesService.delete,
        onSuccess: () => {
            toast.success('Category successfuly deleted!');
            return queryClient.invalidateQueries({ queryKey: [CATEGORY_KEY] });
        },
    });
}
