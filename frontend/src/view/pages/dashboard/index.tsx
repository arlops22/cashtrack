import { DashboardProvider } from './components/DashboardContext';

import DashboardHeader from './components/DashboardHeader';
import TotalsList from './components/TotalsList';

export default function Dashboard() {
    return (
        <DashboardProvider>
            <DashboardHeader />
            <TotalsList />
        </DashboardProvider>
    );
}
