import { useNavigate } from 'react-router-dom';
import { Scale, TrendingDown, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useDashboard } from './DashboardContext/useDashboard';

import { Skeleton } from '../../../components/ui/Skeleton';
import ExpensesChart from './ExpensesChart';
import ExpensesByCategoryChart from './ExpensesByCategoryChart';
import TotalValueCard from './TotalValueCard';
import DashboardFilters from './DashboardFilters';
import EmptyList from '../../../components/EmptyList';
import Button from '../../../components/Button';

export default function DashboardContent() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { accounts, metrics, isLoadingMetrics } = useDashboard();

    return accounts.length ? (
        <>
            <DashboardFilters />
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
            <div className="grid lg:grid-cols-2 items-start gap-4">
                {!metrics || isLoadingMetrics ? (
                    <>
                        <Skeleton className="h-80 w-full" />
                        <Skeleton className="h-80 w-full" />
                    </>
                ) : (
                    <>
                        <ExpensesChart data={metrics.monthlyTotals ?? []} />
                        <ExpensesByCategoryChart data={metrics.categorySummary ?? []} />
                    </>
                )}
            </div>
        </>
    ) : (
        <EmptyList
            title={t('dashboard.empty.title')}
            description={t('dashboard.empty.description')}
            actionComponent={
                <div className="flex items-center gap-2">
                    <Button onClick={() => navigate('/bank-accounts')} size="md">
                        {t('dashboard.empty.addAccount')}
                    </Button>
                    <Button onClick={() => navigate('/transactions')} size="md" color="secondary" variant="outlined">
                        {t('dashboard.empty.addTransaction')}
                    </Button>
                </div>
            }
        />
    );
}
