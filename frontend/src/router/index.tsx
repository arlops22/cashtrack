import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../view/layouts/AuthLayout';

import SignInPage from '../view/pages/auth/sign-in';
import BlankLayout from '../view/layouts/BlankLayout';

export const router = createBrowserRouter([
    {
        path: '/auth',
        Component: AuthLayout,
        children: [{ path: 'sign-in', Component: SignInPage }],
    },
    {
        path: '/',
        Component: BlankLayout,
        children: [{ path: '/', Component: SignInPage }],
    },
]);
