import { Outlet } from 'react-router-dom';

import BlankLayout from './BlankLayout';

const AuthLayout = () => {
    return (
        <BlankLayout>
            <div className="container">
                <div className="flex flex-col items-center">
                    <div className="w-1/2">
                        <div className="flex flex-col items-center pb-xhuge">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </BlankLayout>
    );
};

export default AuthLayout;
