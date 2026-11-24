import { useDashboard } from './DashboardContext/useDashboard';

import { Skeleton } from '../../../components/ui/Skeleton';
import ExpensesChart from './ExpensesChart';
import ExpensesByCategoryChart from './ExpensesByCategoryChart';

export default function ChartsList() {
    const { metrics, isLoadingMetrics } = useDashboard();

    return (
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
    );
}
