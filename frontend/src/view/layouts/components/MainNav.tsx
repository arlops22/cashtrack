import { NavLink, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type { NavItem } from '../config/nav-items';

import { SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../../../view/components/ui/sidebar';
import { useSidebar } from '../../../app/hooks/useSidebar';

type TProps = {
    items: NavItem[];
};

export default function MainNav({ items }: TProps) {
    const { t } = useTranslation();
    const { isMobile, toggleSidebar } = useSidebar();

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map(({ path, title, icon: Icon }) => (
                    <SidebarMenuItem key={path}>
                        <SidebarMenuButton
                            tooltip={title}
                            asChild
                            isActive={Boolean(useMatch({ path, end: path === '/' }))}
                            onClick={isMobile ? toggleSidebar : () => {}}
                        >
                            <NavLink to={path} end={path === '/'} title={title}>
                                <Icon size={16} />
                                <span>{t(title)}</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
