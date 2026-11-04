import { Outlet, useMatches } from 'react-router-dom';

import { SidebarProvider } from '../../app/contexts/SidebarContext';

import { TooltipProvider } from '../components/ui/Tooltip';
import { SidebarInset } from '../components/ui/sidebar';
import AppSidebar from './components/AppSidebar';
import SidebarTrigger from './components/SidebarTrigger';
import Typography from '../components/Typography';

type RouteHandle = { title?: string };

function usePageTitle() {
    const matches = useMatches();

    const titles = matches.map(match => (match.handle as RouteHandle | undefined)?.title).filter(Boolean);

    return titles[titles.length - 1];
}

export default function AppLayout() {
    const title = usePageTitle();

    return (
        <TooltipProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger />
                            <Typography as="h1" variant="h6">
                                {title}
                            </Typography>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col p-4">
                        <Outlet />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
}
