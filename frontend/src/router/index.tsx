import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../view/layouts/AuthLayout';
import BlankLayout from '../view/layouts/BlankLayout';
import AuthGuard from './AuthGuard';

import SignInPage from '../view/pages/auth/sign-in';
import Home from '../view/pages/home';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: BlankLayout,
        children: [
            {
                element: <AuthGuard isPrivate={false} />,
                children: [
                    {
                        path: 'auth',
                        Component: AuthLayout,
                        children: [{ path: 'sign-in', Component: SignInPage }],
                    },
                ],
            },
            {
                element: <AuthGuard isPrivate />,
                children: [{ index: true, Component: Home }],
            },
        ],
    },
]);
