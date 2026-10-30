import { Navigate, Outlet } from 'react-router-dom';

import { localStorageKeys } from '../app/config/local-storage-keys';

interface AuthGuardProps {
    isPrivate: boolean;
}

export default function AuthGuard({ isPrivate }: AuthGuardProps) {
    const isAuthenticated = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    if (!isAuthenticated && isPrivate) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    if (isAuthenticated && !isPrivate) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
