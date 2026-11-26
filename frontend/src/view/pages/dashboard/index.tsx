import { useTranslation } from 'react-i18next';

import { DashboardProvider } from './components/DashboardContext';

import Header from '../../components/Header';
import DashboardFilters from './components/DashboardFilters';
import TotalsList from './components/TotalsList';
import ChartsList from './components/ChartsList';

export default function Dashboard() {
    const { t } = useTranslation();

    return (
        <DashboardProvider>
            <Header title={t('dashboard.title')} />
            <div className="flex flex-col p-4 gap-6">
                <DashboardFilters />
                <TotalsList />
                <ChartsList />
            </div>
        </DashboardProvider>
    );
}
