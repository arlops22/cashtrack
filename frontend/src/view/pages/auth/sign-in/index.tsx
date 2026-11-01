import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import Typography from '../../../components/atoms/Typography';

export default function SignIn() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <form className="h-full w-full flex flex-col justify-between sm:justify-center sm:gap-8 sm:pb-[200px] sm:w-2/3 md:w-1/3">
            <div>
                <Typography as="h1" variant="h5" className="mb-2">
                    Sign In to your account
                </Typography>
                <Typography as="p" variant="body-md" className="mb-6">
                    If you are new{' '}
                    <Link className="link" to="/auth/sign-up">
                        create an account
                    </Link>
                </Typography>
                <Input type="text" placeholder="E-mail" className="mb-4" />
                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    onRightIconClick={() => setIsPasswordVisible(oldState => !oldState)}
                />
            </div>
            <Button type="submit">Log in</Button>
        </form>
    );
}
