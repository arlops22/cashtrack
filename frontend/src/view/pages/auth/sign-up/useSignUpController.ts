import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

import { useAuth } from '../../../../app/hooks/useAuth';
import { authService } from '../../../../app/services/authService';

const schema = z.object({
    firstName: z.string().trim().min(1, 'Enter a valid first name'),
    lastName: z.string().trim().min(1, 'Enter a valid last name'),
    email: z.email('Enter a valid first name'),
    password: z.string().min(8, 'The passowrd must have at least 8 characters'),
});

export type SignUpSchema = z.infer<typeof schema>;

export function useSignUpController() {
    const { signIn } = useAuth();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(schema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: authService.signUp,
        onSuccess: ({ accessToken }) => signIn(accessToken),
        onError: error => {
            const isInvalidCredentials = isAxiosError(error) && error.response?.status === 409;

            toast.error(isInvalidCredentials ? 'Invalid Credentials!' : 'Unable to sign up. Please try again.');
        },
    });

    const handleSubmit = hookFormSubmit(data => mutate(data));

    return { register, errors, handleSubmit, isPending };
}
