import { use } from 'react';

import { DashboardContext } from '.';

export function useDashboard() {
    const context = use(DashboardContext);
    if (!context) throw new Error('useDashboard must be used within an DashboardProvider');
    return context;
}
