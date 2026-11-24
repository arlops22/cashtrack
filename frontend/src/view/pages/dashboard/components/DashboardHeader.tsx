import { useDashboard } from './DashboardContext/useDashboard';

import Header from '../../../components/Header';
import DateRangePickerField from '../../../components/DateRangePickerField';

export default function DashboardHeader() {
    const { range, setRange } = useDashboard();

    return (
        <Header
            title="Dashboard"
            actionComponent={
                <div className="flex items-center gap-4">
                    <DateRangePickerField onChange={range => setRange(range)} value={range} />
                </div>
            }
        />
    );
}
