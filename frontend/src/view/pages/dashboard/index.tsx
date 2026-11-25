import { DashboardProvider } from './components/DashboardContext';

import Header from '../../components/Header';
import DashboardFilters from './components/DashboardFilters';
import TotalsList from './components/TotalsList';
import ChartsList from './components/ChartsList';

export default function Dashboard() {
    return (
        <DashboardProvider>
            <Header title="Dashboard" />
            <div className="flex flex-col p-4 gap-6">
                <DashboardFilters />
                <TotalsList />
                <ChartsList />
            </div>
        </DashboardProvider>
    );
}
