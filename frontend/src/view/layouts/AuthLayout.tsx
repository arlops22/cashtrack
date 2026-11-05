import { Outlet } from 'react-router-dom';

import Logo from '../components/Logo';

const AuthLayout = () => {
    return (
        <div className="flex flex-col flex-column items-center justify-center p-4 pt-6 w-full h-full bg-background">
            <Logo className="h-8 text-gray-500 self-start mb-8 sm:self-center sm:mb-0" />
            <Outlet />
        </div>
    );
};

export default AuthLayout;
