import { ArrowUpDown, Home, type LucideIcon } from 'lucide-react';
import type { ParseKeys } from 'i18next';

import { PRIVATE_ROUTES } from '../../../app/config/routes';

export type NavItem = {
    title: ParseKeys;
    path: string;
    icon: LucideIcon;
    end?: boolean;
};

export const navItems: NavItem[] = [
    { title: 'nav.dashboard', path: PRIVATE_ROUTES.dashboard, icon: Home, end: true },
    { title: 'nav.transactions', path: PRIVATE_ROUTES.transactions, icon: ArrowUpDown },
];
