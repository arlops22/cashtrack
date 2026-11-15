import { Filter } from 'lucide-react';

import { useDashboard } from './DashboardContext/useDashboard';

import Button from '../../../components/Button';
import Header from '../../../components/Header';

export default function DashboardHeader() {
    const { setIsFilterModalOpen } = useDashboard();

    return (
        <Header
            title="Dashboard"
            actionComponent={
                <div className="flex items-center gap-4">
                    <Button onClick={() => setIsFilterModalOpen(true)} size="md" variant="outlined" color="secondary">
                        <Filter size={14} />
                        <span>Filters</span>
                    </Button>
                </div>
            }
        />
    );
}
