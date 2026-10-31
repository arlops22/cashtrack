import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../view/layouts/AuthLayout';
import BlankLayout from '../view/layouts/BlankLayout';
import AuthGuard from './AuthGuard';

import SignIn from '../view/pages/auth/sign-in';
import Home from '../view/pages/home';
import SignUp from '../view/pages/auth/sign-up';

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
                        children: [
                            { path: 'sign-in', Component: SignIn },
                            { path: 'sign-up', Component: SignUp },
                        ],
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
