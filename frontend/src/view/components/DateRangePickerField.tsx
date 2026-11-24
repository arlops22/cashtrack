import { useState } from 'react';
import { Calendar } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { DateRange } from 'react-day-picker';
import moment from 'moment';

import { cn, getDateRangePresets, type DateRangePreset } from '../../app/utils';

import { DateRangePicker } from './DateRangePicker';
import Button from './Button';

type TProps = {
    value: DateRange;
    onChange?(date: DateRange): void;
    className?: string;
};

const isSameDay = (a?: Date, b?: Date) => a !== undefined && b !== undefined && moment(a).isSame(b, 'day');

const isSameRange = (a: DateRange, b: DateRange) => isSameDay(a.from, b.from) && isSameDay(a.to, b.to);

function formatRangeLabel(value: DateRange, presets: DateRangePreset[]) {
    const matchingPreset = presets.find(({ range }) => isSameRange(range, value));
    if (matchingPreset) return matchingPreset.label;

    if (!value.from) return 'Select period';

    const from = moment(value.from).format('ll');
    if (!value.to || isSameDay(value.from, value.to)) return from;

    return `${from} - ${moment(value.to).format('ll')}`;
}

export default function DateRangePickerField(props: TProps) {
    const { value, onChange, className } = props;

    const [open, setOpen] = useState(false);

    const presets = getDateRangePresets();

    function handleSelectPreset(range: DateRange) {
        onChange?.(range);
        setOpen(false);
    }

    return (
        <div className={cn('w-full', className)}>
            <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
                <PopoverPrimitive.Trigger asChild>
                    <Button className="px-3" type="button" variant="outlined" color="secondary" size="md">
                        <Calendar size={20} />
                        {<span className="text-body-lg">{formatRangeLabel(value, presets)}</span>}
                    </Button>
                </PopoverPrimitive.Trigger>

                <PopoverPrimitive.Portal>
                    <PopoverPrimitive.Content
                        sideOffset={8}
                        align="end"
                        className="z-50 flex max-w-200 w-full origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
                    >
                        <div className="flex items-stretch">
                            <div className="flex flex-col shrink-0 w-36 border-r border-border pt-2">
                                {presets.map(({ id, label, range }) => {
                                    const isSelected = isSameRange(range, value);

                                    return (
                                        <Button
                                            key={id}
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            color="secondary"
                                            aria-pressed={isSelected}
                                            className={cn(
                                                'w-full justify-start sm:rounded-none',
                                                isSelected && 'bg-primary! text-white! hover:bg-primary!',
                                            )}
                                            onClick={() => handleSelectPreset(range)}
                                        >
                                            {label}
                                        </Button>
                                    );
                                })}
                            </div>
                            <DateRangePicker onChange={onChange} value={value ?? new Date()} />
                        </div>
                    </PopoverPrimitive.Content>
                </PopoverPrimitive.Portal>
            </PopoverPrimitive.Root>
        </div>
    );
}
