import { Scale, TrendingDown, TrendingUp } from 'lucide-react';

import { useDashboard } from './DashboardContext/useDashboard';

import { Skeleton } from '../../../components/ui/Skeleton';
import TotalValueCard from './TotalValueCard';

export default function TotalsList() {
    const { metrics, isLoadingMetrics } = useDashboard();

    return (
        <div className="grid grid-cols-3 items-start gap-4">
            {!metrics || isLoadingMetrics ? (
                <>
                    <Skeleton className="h-36 w-full" />
                    <Skeleton className="h-36 w-full" />
                    <Skeleton className="h-36 w-full" />
                </>
            ) : (
                <>
                    <TotalValueCard label="Total Income" value={metrics.summary.income} icon={<TrendingUp />} />
                    <TotalValueCard
                        label="Total Expense"
                        value={metrics.summary.expense * -1}
                        icon={<TrendingDown />}
                    />
                    <TotalValueCard label="Total Net Income" value={metrics.summary.balance} icon={<Scale />} />
                </>
            )}
        </div>
    );
}
