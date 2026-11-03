import { Home, CreditCard, ChevronsUpDown } from 'lucide-react';
import { NavLink, useMatch } from 'react-router-dom';

import { useAuth } from '../../../app/hooks/useAuth';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '../atoms/Sidebar';
import { Avatar, AvatarFallback } from '../atoms/Avatar';
import Logo from '../atoms/Logo';
import SidebarMenuButton from '../atoms/SidebarMenuButton';

const navItems = [
    { title: 'Dashboard', path: '/', icon: Home },
    { title: 'Transactions', path: '/transactions', icon: CreditCard },
];

export default function AppSidebar() {
    const { user } = useAuth();

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <NavLink to="/">
                                <Logo className="text-teal-900" />
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {navItems.map(({ title, path, icon: Icon }) => (
                            <SidebarMenuItem key={path}>
                                <SidebarMenuButton asChild isActive={Boolean(useMatch({ path, end: path === '/' }))}>
                                    <NavLink to={path} end={path === '/'} title={title}>
                                        <Icon size={16} />
                                        <span className="group-data-[state=collapsed]/sidebar:hidden">{title}</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarFallback className="rounded-lg">
                                {user?.firstName[0]}
                                {user?.lastName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{`${user?.firstName} ${user?.lastName}`}</span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    );
}
