import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="p-4 pt-10 w-full h-full bg-gray-0">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
