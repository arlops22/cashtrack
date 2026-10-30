import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';

export default function SignIn() {
    return (
        <form className="w-full flex flex-col">
            <Input type="text" label="E-mail" placeholder="E-mail" />
            <Input type="text" label="Password" placeholder="Password" />
            <Button type="submit">Log in</Button>
        </form>
    );
}
