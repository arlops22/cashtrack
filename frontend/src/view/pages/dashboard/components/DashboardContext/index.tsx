import { createContext, useEffect, useMemo, useState } from 'react';

import type { MetricsResponse } from '../../../../../app/services/transactionsService/metrics';
import { useTransactionsMetrics } from '../../../../../app/hooks/transactions';
import { useAuth } from '../../../../../app/hooks/useAuth';

type FilterState = {
    account: string;
    from: string;
    to: string;
};

export interface DashboardContextProps {
    metrics?: MetricsResponse;
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    isFilterModalOpen: boolean;
    setIsFilterModalOpen: (isOpen: boolean) => void;
    isLoadingMetrics: boolean;
}

export const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

const now = new Date();

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading } = useAuth();

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        account: user?.bankAccounts[0].id.toString() ?? '',
        from: `${now.getFullYear()}-01-01`,
        to: `${now.getFullYear() + 1}-01-01`,
    });

    const { metrics, refetchMetrics, isLoading } = useTransactionsMetrics({
        bankAccountId: Number(filters.account),
        from: filters.from,
        to: filters.to,
    });

    useEffect(() => {
        refetchMetrics();
    }, [filters, refetchMetrics]);

    const value = useMemo<DashboardContextProps>(
        () => ({
            metrics,
            filters,
            setFilters,
            isFilterModalOpen,
            setIsFilterModalOpen,
            isLoadingMetrics: isLoading || isUserLoading,
        }),
        [metrics, filters, setFilters, isFilterModalOpen, setIsFilterModalOpen, isLoading],
    );

    return <DashboardContext value={value}>{children}</DashboardContext>;
}
