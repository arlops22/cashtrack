import { ChevronsUpDown, CreditCard, Layers, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { useSidebar } from '../../../app/hooks/useSidebar';
import { PRIVATE_ROUTES } from '../../../app/config/routes';
import type { User } from '../../../app/entities/User';

import { Avatar, AvatarFallback } from '../../components/ui/Avatar';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../../../view/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../components/ui/DropDownMenu';

type TProp = {
    user: User | undefined;
    signOut: () => void;
};

export default function UserNav({ user, signOut }: TProp) {
    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                    {user?.firstName[0]}
                                    {user?.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{`${user?.firstName} ${user?.lastName}`}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        {user?.firstName[0]}
                                        {user?.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{`${user?.firstName} ${user?.lastName}`}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <NavLink to={PRIVATE_ROUTES.bankAccounts}>
                                    <CreditCard />
                                    Bank Accounts
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <NavLink to={PRIVATE_ROUTES.categories}>
                                    <Layers />
                                    Categories
                                </NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-800" onClick={signOut}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
