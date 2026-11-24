import { getDefaultClassNames, type DateRange } from 'react-day-picker';
import { cn, getDateRangePreset } from '../../app/utils';

import { Calendar } from './ui/Calendar';

type TProps = {
    value: DateRange;
    onChange?(date: DateRange): void;
};

const DEFAULT_RANGE = getDateRangePreset('thisYear').range;

export function DateRangePicker({ value, onChange }: TProps) {
    const defaultClassNames = getDefaultClassNames();

    const hasBand = Boolean(value.from && value.to && value.from.getTime() !== value.to.getTime());

    return (
        <Calendar
            mode="range"
            numberOfMonths={2}
            selected={value}
            onSelect={range => onChange?.(range ?? DEFAULT_RANGE)}
            defaultMonth={value.from}
            classNames={{
                week: cn('mt-2 flex h-8 w-full', defaultClassNames.week),
                range_start: cn(
                    hasBand && 'bg-linear-to-r from-transparent from-50% to-teal-0 to-50%',
                    defaultClassNames.range_start,
                ),
                range_middle: cn('bg-teal-0 first:rounded-l-full last:rounded-r-full', defaultClassNames.range_middle),
                range_end: cn(
                    hasBand && 'bg-linear-to-l from-transparent from-50% to-teal-0 to-50%',
                    defaultClassNames.range_end,
                ),
            }}
        />
    );
}
