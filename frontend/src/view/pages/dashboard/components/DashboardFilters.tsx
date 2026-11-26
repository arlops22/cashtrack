import { useTranslation } from 'react-i18next';

import { useDashboard } from './DashboardContext/useDashboard';

import Select from '../../../components/Select';
import DateRangePickerField from '../../../components/DateRangePickerField';
import Typography from '../../../components/Typography';

export default function DashboardFilters() {
    const { t } = useTranslation();
    const { range, setRange, selectedAccount, setSelectedAccount, accounts } = useDashboard();

    return (
        <div className="bg-white border rounded-md p-4 flex flex-col gap-4 sm:items-center sm:flex-row">
            <Typography variant="body-lg" color="gray-700">
                {t('dashboard.filters.label')}
            </Typography>
            <Select
                className="sm:w-32 shrink-0"
                selectTriggerClassName="h-10 py-0 px-4 bg-transparent border-secondary"
                labelClassName="hidden"
                placeholder={t('dashboard.filters.account')}
                value={selectedAccount}
                onChange={value => setSelectedAccount(value.toString())}
                options={accounts.map(account => ({
                    value: account.id.toString(),
                    label: account.name,
                }))}
            />
            <DateRangePickerField className="sm:w-fit" onChange={range => setRange(range)} value={range} />
        </div>
    );
}
