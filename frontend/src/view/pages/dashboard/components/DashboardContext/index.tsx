import { createContext, useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import moment from 'moment';

import type { MetricsResponse } from '../../../../../app/services/transactionsService/metrics';
import type { BankAccount } from '../../../../../app/entities/BankAccount';
import { getDateRangePreset } from '../../../../../app/utils';
import { useTransactionsMetrics } from '../../../../../app/hooks/transactions';
import { useAuth } from '../../../../../app/hooks/useAuth';

export interface DashboardContextProps {
    accounts: BankAccount[];
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
    const [selectedAccount, setSelectedAccount] = useState(user?.bankAccounts[0]?.id.toString());

    const { metrics, isLoading } = useTransactionsMetrics({
        bankAccountId: Number(selectedAccount),
        from: range.from && toApiDate(range.from),
        to: range.to && toApiDate(range.to),
    });

    const value = useMemo<DashboardContextProps>(
        () => ({
            accounts: user?.bankAccounts ?? [],
            metrics,
            range,
            setRange,
            selectedAccount,
            setSelectedAccount,
            isLoadingMetrics: isLoading || isUserLoading,
        }),
        [user, metrics, range, setRange, selectedAccount, setSelectedAccount, , isLoading],
    );

    return <DashboardContext value={value}>{children}</DashboardContext>;
}
