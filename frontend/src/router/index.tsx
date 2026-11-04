import { createBrowserRouter } from 'react-router-dom';

import { PRIVATE_ROUTES } from '../app/config/routes';

import AuthLayout from '../view/layouts/AuthLayout';
import BlankLayout from '../view/layouts/BlankLayout';
import AuthGuard from './AuthGuard';

import SignIn from '../view/pages/auth/sign-in';
import Home from '../view/pages/home';
import SignUp from '../view/pages/auth/sign-up';
import AppLayout from '../view/layouts/AppLayout';

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
                children: [
                    {
                        Component: AppLayout,
                        children: [
                            {
                                index: true,
                                path: PRIVATE_ROUTES.dashboard,
                                Component: Home,
                                handle: { title: 'Dashboard' },
                            },
                            { path: PRIVATE_ROUTES.transactions, Component: Home, handle: { title: 'Transactions' } },
                            { path: PRIVATE_ROUTES.bankAccounts, Component: Home, handle: { title: 'Bank Accounts' } },
                            { path: PRIVATE_ROUTES.categories, Component: Home, handle: { title: 'Categories' } },
                        ],
                    },
                ],
            },
        ],
    },
]);
