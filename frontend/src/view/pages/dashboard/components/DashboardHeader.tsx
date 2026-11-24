import { useDashboard } from './DashboardContext/useDashboard';

import Header from '../../../components/Header';
import DateRangePickerField from '../../../components/DateRangePickerField';
import Select from '../../../components/Select';

export default function DashboardHeader() {
    const { range, setRange, selectedAccount, setSelectedAccount, accounts } = useDashboard();

    return (
        <Header
            title="Dashboard"
            actionComponent={
                <div className="flex items-center gap-4">
                    <Select
                        className="w-32 shrink-0"
                        selectTriggerClassName="h-10 py-0 px-4 bg-transparent border-secondary"
                        labelClassName="hidden"
                        placeholder="Account:"
                        value={selectedAccount}
                        onChange={value => setSelectedAccount(value.toString())}
                        options={accounts.map(account => ({
                            value: account.id.toString(),
                            label: account.name,
                        }))}
                    />
                    <DateRangePickerField onChange={range => setRange(range)} value={range} />
                </div>
            }
        />
    );
}
