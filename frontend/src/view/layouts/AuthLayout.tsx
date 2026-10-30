import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="container">
            <div className="flex flex-col items-center">
                <div className="w-1/2">
                    <div className="flex flex-col items-center pb-xhuge">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
