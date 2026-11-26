import { ChevronsUpDown, CreditCard, Layers, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { LANGUAGES } from '../../../app/i18n';
import { cn } from '../../../app/utils';
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
import Button from '../../components/Button';

type TProp = {
    user: User | undefined;
    signOut: () => void;
};

export default function UserNav({ user, signOut }: TProp) {
    const { t, i18n } = useTranslation();
    const { isMobile, toggleSidebar } = useSidebar();

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
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-72 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex justify-between items-center px-1">
                                <div className="flex items-center gap-2 py-1.5 text-left text-sm">
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
                                <div className="flex items-center bg-muted rounded-full gap-1 p-1">
                                    {LANGUAGES.map(lang => (
                                        <Button
                                            key={lang.value}
                                            onClick={() => i18n.changeLanguage(lang.value)}
                                            color="secondary"
                                            variant="ghost"
                                            size="icon-sm"
                                            className={cn(
                                                'aspect-auto gap-1 w-fit px-2!',
                                                i18n.resolvedLanguage === lang.value && 'bg-gray-300 hover:bg-gray-300',
                                            )}
                                        >
                                            <img src={lang.flag} alt="" className="size-5" />
                                            {lang.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={isMobile ? toggleSidebar : () => {}} asChild>
                                <NavLink to={PRIVATE_ROUTES.bankAccounts}>
                                    <CreditCard />
                                    {t('nav.bankAccounts')}
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={isMobile ? toggleSidebar : () => {}} asChild>
                                <NavLink to={PRIVATE_ROUTES.categories}>
                                    <Layers />
                                    {t('nav.categories')}
                                </NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-800" onClick={signOut}>
                            <LogOut />
                            {t('nav.logOut')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
