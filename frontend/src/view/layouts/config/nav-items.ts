import { ArrowUpDown, Home, type LucideIcon } from 'lucide-react';

import { PRIVATE_ROUTES } from '../../../app/config/routes';

export type NavItem = {
    title: string;
    path: string;
    icon: LucideIcon;
    end?: boolean;
};

export const navItems: NavItem[] = [
    { title: 'Dashboard', path: PRIVATE_ROUTES.dashboard, icon: Home, end: true },
    { title: 'Transactions', path: PRIVATE_ROUTES.transactions, icon: ArrowUpDown },
];
