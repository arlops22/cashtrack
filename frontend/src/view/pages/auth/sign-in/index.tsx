import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

import { useSignInController } from './useSignInController';

import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import Typography from '../../../components/atoms/Typography';

export default function SignIn() {
    const { register, errors, handleSubmit, isPending } = useSignInController();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full w-full flex flex-col justify-between sm:justify-center sm:gap-8 sm:pb-25 sm:w-2/3 md:w-1/3"
        >
            <div>
                <Typography as="h1" variant="h5" className="mb-2">
                    Log in to your account
                </Typography>
                <Typography as="p" variant="body-md" className="mb-6">
                    New here?{' '}
                    <Link className="link" to="/auth/sign-up">
                        Create an account
                    </Link>
                </Typography>
                <Input
                    type="email"
                    placeholder="Email"
                    className="mb-4"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    rightIconComponent={isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    onRightIconClick={() => setIsPasswordVisible(oldState => !oldState)}
                    error={errors.password?.message}
                    {...register('password')}
                />
            </div>
            <Button isLoading={isPending} type="submit">
                Log in
            </Button>
        </form>
    );
}
