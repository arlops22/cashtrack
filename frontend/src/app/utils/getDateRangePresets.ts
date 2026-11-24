import moment, { type Moment } from 'moment';
import type { DateRange } from 'react-day-picker';

export type DateRangePresetId =
    | 'today'
    | 'yesterday'
    | 'thisWeek'
    | 'lastWeek'
    | 'lastTwoWeeks'
    | 'thisMonth'
    | 'lastMonth'
    | 'thisYear'
    | 'lastYear';

export type DateRangePreset = {
    id: DateRangePresetId;
    label: string;
    range: DateRange;
};

const PRESET_LABELS: Record<DateRangePresetId, string> = {
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This week',
    lastWeek: 'Last week',
    lastTwoWeeks: 'Last two weeks',
    thisMonth: 'This month',
    lastMonth: 'Last month',
    thisYear: 'This year',
    lastYear: 'Last year',
};

const toRange = (from: Moment, to: Moment): DateRange => ({
    from: from.clone().startOf('day').toDate(),
    to: to.clone().startOf('day').toDate(),
});

function getPresetRanges(): Record<DateRangePresetId, DateRange> {
    const today = moment();
    const yesterday = today.clone().subtract(1, 'day');
    const lastWeek = today.clone().subtract(1, 'week');
    const lastMonth = today.clone().subtract(1, 'month');
    const lastYear = today.clone().subtract(1, 'year');

    return {
        today: toRange(today, today),
        yesterday: toRange(yesterday, yesterday),
        thisWeek: toRange(today.clone().startOf('week'), today.clone().endOf('week')),
        lastWeek: toRange(lastWeek.clone().startOf('week'), lastWeek.clone().endOf('week')),
        lastTwoWeeks: toRange(today.clone().subtract(13, 'days'), today),
        thisMonth: toRange(today.clone().startOf('month'), today.clone().endOf('month')),
        lastMonth: toRange(lastMonth.clone().startOf('month'), lastMonth.clone().endOf('month')),
        thisYear: toRange(today.clone().startOf('year'), today.clone().endOf('year')),
        lastYear: toRange(lastYear.clone().startOf('year'), lastYear.clone().endOf('year')),
    };
}

export function getDateRangePresets(): DateRangePreset[] {
    const ranges = getPresetRanges();

    return (Object.keys(PRESET_LABELS) as DateRangePresetId[]).map(id => ({
        id,
        label: PRESET_LABELS[id],
        range: ranges[id],
    }));
}

export function getDateRangePreset(id: DateRangePresetId): DateRangePreset {
    return { id, label: PRESET_LABELS[id], range: getPresetRanges()[id] };
}
