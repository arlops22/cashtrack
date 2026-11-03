import { PanelLeft } from 'lucide-react';

import { useSidebar } from '../../../app/hooks/useSidebar';

import Button from '../atoms/Button';

export default function SidebarTrigger() {
    const { toggleSidebar } = useSidebar();

    return (
        <Button color="secondary" variant="icon" size="md" onClick={toggleSidebar}>
            <PanelLeft />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}
