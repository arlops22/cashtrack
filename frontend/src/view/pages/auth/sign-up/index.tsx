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
                <Input type="text" label="First Name" placeholder="First Name" className="mb-2" />
                <Input type="text" label="Last Name" placeholder="Last Name" className="mb-2" />
                <Input type="text" label="E-mail" placeholder="E-mail" className="mb-2" />
                <Input type="text" label="Password" placeholder="Password" />
            </div>
            <Button type="submit">Create Account</Button>
        </form>
    );
}
