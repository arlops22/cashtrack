import { DashboardProvider } from './components/DashboardContext';

import DashboardHeader from './components/DashboardHeader';
import TotalsList from './components/TotalsList';
import ChartsList from './components/ChartsList';

export default function Dashboard() {
    return (
        <DashboardProvider>
            <DashboardHeader />
            <div className="flex flex-col p-4 gap-6">
                <TotalsList />
                <ChartsList />
            </div>
        </DashboardProvider>
    );
}
