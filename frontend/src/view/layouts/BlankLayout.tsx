import { Outlet } from 'react-router';

const BlankLayout = () => {
    return (
        <div className="flex flex-column items-center justify-center h-screen">
            <Outlet />
        </div>
    );
};

export default BlankLayout;
