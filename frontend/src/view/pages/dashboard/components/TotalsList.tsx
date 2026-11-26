import { Scale, TrendingDown, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useDashboard } from './DashboardContext/useDashboard';

import { Skeleton } from '../../../components/ui/Skeleton';
import TotalValueCard from './TotalValueCard';

export default function TotalsList() {
    const { t } = useTranslation();
    const { metrics, isLoadingMetrics } = useDashboard();

    return (
        <div className="grid lg:grid-cols-3 items-start gap-4">
            {!metrics || isLoadingMetrics ? (
                <>
                    <Skeleton className="h-36 w-full" />
                    <Skeleton className="h-36 w-full" />
                    <Skeleton className="h-36 w-full" />
                </>
            ) : (
                <>
                    <TotalValueCard
                        label={t('dashboard.totals.income')}
                        value={metrics.summary.income}
                        icon={<TrendingUp />}
                    />
                    <TotalValueCard
                        label={t('dashboard.totals.expense')}
                        value={metrics.summary.expense * -1}
                        icon={<TrendingDown />}
                    />
                    <TotalValueCard
                        label={t('dashboard.totals.netIncome')}
                        value={metrics.summary.balance}
                        icon={<Scale />}
                    />
                </>
            )}
        </div>
    );
}
