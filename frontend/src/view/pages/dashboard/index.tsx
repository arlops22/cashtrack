import { useTranslation } from 'react-i18next';

import { DashboardProvider } from './components/DashboardContext';

import Header from '../../components/Header';
import DashboardContent from './components/DashboardContent';

export default function Dashboard() {
    const { t } = useTranslation();

    return (
        <DashboardProvider>
            <Header title={t('dashboard.title')} />
            <div className="flex flex-col p-4 gap-6">
                <DashboardContent />
            </div>
        </DashboardProvider>
    );
}
