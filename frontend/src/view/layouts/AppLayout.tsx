import { Outlet } from 'react-router-dom';

import { SidebarProvider } from '../../app/contexts/SidebarContext';

import AppSidebar from '../components/molecules/AppSidebar';
import SidebarTrigger from '../components/molecules/SidebarTrigger';

export default function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    );
}
