import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeClosed } from 'lucide-react';

import { useSignUpController } from './useSignUpController';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Typography from '../../../components/Typography';

export default function SignUp() {
    const { register, errors, handleSubmit, isPending } = useSignUpController();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full w-full flex flex-col justify-between sm:justify-center sm:gap-8 sm:pb-25 sm:w-2/3 md:w-1/3"
        >
            <div>
                <Typography as="h1" variant="h5" className="mb-2">
                    Create an account
                </Typography>
                <Typography as="p" variant="body-md" className="mb-6">
                    Already have an account?{' '}
                    <Link className="link" to="/auth/sign-in">
                        Log in
                    </Link>
                </Typography>
                <Input
                    type="text"
                    placeholder="First Name"
                    className="mb-4"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    className="mb-4"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                />
                <Input
                    type="text"
                    placeholder="Email"
                    className="mb-4"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    rightIconComponent={isPasswordVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
                    onRightIconClick={() => setIsPasswordVisible(oldState => !oldState)}
                    error={errors.password?.message}
                    {...register('password')}
                />
            </div>
            <Button isLoading={isPending} type="submit">
                Create account
            </Button>
        </form>
    );
}
