import type { ReactNode } from 'react';

import SidebarTrigger from '../layouts/components/SidebarTrigger';
import Typography from './Typography';

type TProps = {
    title: string;
    actionComponent?: ReactNode;
};

export default function Header({ title, actionComponent }: TProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex flex-1 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <Typography as="h1" variant="h6">
                        {title}
                    </Typography>
                </div>
                {actionComponent}
            </div>
        </header>
    );
}
