import { createContext, useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import type { MetricsResponse } from '../../../../../app/services/transactionsService/metrics';
import { getDateRangePreset } from '../../../../../app/utils';
import { useTransactionsMetrics } from '../../../../../app/hooks/transactions';
import { useAuth } from '../../../../../app/hooks/useAuth';
import type { DateRange } from 'react-day-picker';

export interface DashboardContextProps {
    metrics?: MetricsResponse;
    range: DateRange;
    setRange: React.Dispatch<React.SetStateAction<DateRange>>;
    selectedAccount: string | undefined;
    setSelectedAccount: React.Dispatch<React.SetStateAction<string | undefined>>;
    isLoadingMetrics: boolean;
}

export const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

const toApiDate = (date: Date) => moment(date).format('YYYY-MM-DD');

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading } = useAuth();

    const [range, setRange] = useState<DateRange>(() => getDateRangePreset('thisYear').range);
    const [selectedAccount, setSelectedAccount] = useState<string>();

    const account = selectedAccount ?? user?.bankAccounts[0]?.id.toString();

    const { metrics, refetchMetrics, isLoading } = useTransactionsMetrics({
        bankAccountId: Number(account),
        from: range.from && toApiDate(range.from),
        to: range.to && toApiDate(range.to),
    });

    useEffect(() => {
        refetchMetrics();
    }, [range, selectedAccount, refetchMetrics]);

    const value = useMemo<DashboardContextProps>(
        () => ({
            metrics,
            range,
            setRange,
            selectedAccount,
            setSelectedAccount,
            isLoadingMetrics: isLoading || isUserLoading,
        }),
        [metrics, range, setRange, selectedAccount, setSelectedAccount, , isLoading],
    );

    return <DashboardContext value={value}>{children}</DashboardContext>;
}
