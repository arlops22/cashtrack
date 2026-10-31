import { Link } from 'react-router-dom';

import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import Typography from '../../../components/atoms/Typography';

export default function SignUp() {
    return (
        <form className="h-full flex flex-col justify-between">
            <div>
                <Typography as="h1" variant="h5" className="mb-2">
                    Create an account
                </Typography>
                <Typography as="p" variant="body-md" className="mb-6">
                    Already has an account?{' '}
                    <Link className="link" to="/auth/sign-in">
                        Log in
                    </Link>
                </Typography>
                <Input type="text" placeholder="First Name" className="mb-4" />
                <Input type="text" placeholder="Last Name" className="mb-4" />
                <Input type="text" placeholder="E-mail" className="mb-4" />
                <Input type="text" placeholder="Password" />
            </div>
            <Button type="submit">Create Account</Button>
        </form>
    );
}
