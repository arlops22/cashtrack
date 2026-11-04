import { NavLink, useMatch } from 'react-router-dom';

import type { NavItem } from '../config/nav-items';

import { SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../../../view/components/ui/sidebar';

type TProps = {
    items: NavItem[];
};

export default function MainNav({ items }: TProps) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map(({ path, title, icon: Icon }) => (
                    <SidebarMenuItem key={path}>
                        <SidebarMenuButton
                            tooltip={title}
                            asChild
                            isActive={Boolean(useMatch({ path, end: path === '/' }))}
                        >
                            <NavLink to={path} end={path === '/'} title={title}>
                                <Icon size={16} />
                                <span>{title}</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
