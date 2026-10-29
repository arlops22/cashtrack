import type { ReactElement } from 'react';
import { Outlet } from 'react-router';

interface IProps {
    children?: ReactElement;
}

const BlankLayout = ({ children }: IProps) => {
    return <div className="flex flex-column items-center justify-center h-screen">{children || <Outlet />}</div>;
};

export default BlankLayout;
