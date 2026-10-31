import { Link } from 'react-router-dom';
import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import Typography from '../../../components/atoms/Typography';

export default function SignIn() {
    return (
        <form className="h-full flex flex-col justify-between">
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
                <Input type="text" label="E-mail" placeholder="E-mail" className="mb-2" />
                <Input type="text" label="Password" placeholder="Password" />
            </div>
            <Button type="submit">Log in</Button>
        </form>
    );
}
