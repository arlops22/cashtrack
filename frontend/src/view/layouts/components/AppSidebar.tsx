import { NavLink } from 'react-router-dom';

import { useAuth } from '../../../app/hooks/useAuth';
import { navItems } from '../config/nav-items';

import Logo from '../../components/Logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '../../../view/components/ui/sidebar';
import UserNav from './UserNav';
import MainNav from './MainNav';

export default function AppSidebar() {
    const { user, signOut } = useAuth();

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink className="group-data-[collapsible=icon]:pl-1!" to="/">
                                <Logo className="text-teal-900" />
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <MainNav items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuItem>
                    <UserNav user={user} signOut={signOut} />
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    );
}
