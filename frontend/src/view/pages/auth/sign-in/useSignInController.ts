import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { useAuth } from '../../../../app/hooks/useAuth';
import { authService } from '../../../../app/services/authService';

const schema = z.object({
    email: z.email('Enter a valid email address'),
    password: z.string().nonempty('Enter your password'),
});

type SignInSchema = z.infer<typeof schema>;

export function useSignInController() {
    const { signIn } = useAuth();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
    } = useForm<SignInSchema>({
        resolver: zodResolver(schema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: authService.signIn,
        onSuccess: ({ accessToken }) => signIn(accessToken),
        onError: error => {
            const isInvalidCredentials = isAxiosError(error) && error.response?.status === 401;

            toast.error(isInvalidCredentials ? 'Invalid Credentials!' : 'Unable to sign in. Please try again.');
        },
    });

    const handleSubmit = hookFormSubmit(data => mutate(data));

    return { register, errors, handleSubmit, isPending };
}
