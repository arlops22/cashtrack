import { createBrowserRouter } from 'react-router-dom';

import { PRIVATE_ROUTES } from '../app/config/routes';

import AuthGuard from './AuthGuard';
import AuthLayout from '../view/layouts/AuthLayout';
import BlankLayout from '../view/layouts/BlankLayout';
import AppLayout from '../view/layouts/AppLayout';

import SignIn from '../view/pages/auth/sign-in';
import SignUp from '../view/pages/auth/sign-up';
import Dashboard from '../view/pages/dashboard';
import Categories from '../view/pages/categories';
import BankAccounts from '../view/pages/bank-accounts';

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
                                Component: Dashboard,
                            },
                            {
                                path: PRIVATE_ROUTES.transactions,
                                Component: Dashboard,
                            },
                            {
                                path: PRIVATE_ROUTES.bankAccounts,
                                Component: BankAccounts,
                            },
                            { path: PRIVATE_ROUTES.categories, Component: Categories },
                        ],
                    },
                ],
            },
        ],
    },
]);
