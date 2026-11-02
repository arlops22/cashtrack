import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import Typography from '../../../components/atoms/Typography';

export default function SignUp() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <form className="h-full w-full flex flex-col justify-between sm:justify-center sm:gap-8 sm:pb-25 sm:w-2/3 md:w-1/3">
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
                <Input type="text" placeholder="First Name" className="mb-4" />
                <Input type="text" placeholder="Last Name" className="mb-4" />
                <Input type="text" placeholder="Email" className="mb-4" />
                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    rightIconComponent={isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    onRightIconClick={() => setIsPasswordVisible(oldState => !oldState)}
                />
            </div>
            <Button type="submit">Create account</Button>
        </form>
    );
}
