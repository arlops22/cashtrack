import { Outlet } from 'react-router-dom';

import { SidebarProvider } from '../../app/contexts/SidebarContext';

import { TooltipProvider } from '../components/ui/Tooltip';
import { SidebarInset } from '../components/ui/sidebar';
import AppSidebar from './components/AppSidebar';

export default function AppLayout() {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
}
