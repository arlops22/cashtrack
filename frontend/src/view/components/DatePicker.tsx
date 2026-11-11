import { useEffect, useRef, type ComponentProps } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';
import { ptBR } from 'react-day-picker/locale';

import { buttonVariants } from './Button/button.variants';
import { cn } from '../../app/utils';

import Button from './Button';

type TProps = {
    value: Date;
    onChange?(date: Date): void;
};

export function DatePicker({ value, onChange }: TProps) {
    const defaultClassNames = getDefaultClassNames();

    return (
        <DayPicker
            mode="single"
            selected={value}
            onSelect={date => onChange?.(date ?? new Date())}
            defaultMonth={value}
            locale={ptBR}
            className={cn(
                'group/calendar p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
            )}
            classNames={{
                root: cn('w-full', defaultClassNames.root),
                months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
                month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
                nav: cn(
                    'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
                    defaultClassNames.nav,
                ),
                button_previous: cn(
                    buttonVariants({ variant: 'ghost', size: 'icon', color: 'secondary' }),
                    'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
                    defaultClassNames.button_previous,
                ),
                button_next: cn(
                    buttonVariants({ variant: 'ghost', size: 'icon', color: 'secondary' }),
                    'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
                    defaultClassNames.button_next,
                ),
                month_caption: cn(
                    'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
                    defaultClassNames.month_caption,
                ),
                dropdowns: cn(
                    'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium',
                    defaultClassNames.dropdowns,
                ),
                dropdown_root: cn(
                    'cn-calendar-dropdown-root relative rounded-(--cell-radius)',
                    defaultClassNames.dropdown_root,
                ),
                dropdown: cn('absolute inset-0 bg-popover opacity-0', defaultClassNames.dropdown),
                caption_label: cn(
                    'font-medium select-none cn-calendar-caption text-sm',
                    defaultClassNames.caption_label,
                ),
                month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
                weekdays: cn('flex', defaultClassNames.weekdays),
                weekday: cn(
                    'flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none',
                    defaultClassNames.weekday,
                ),
                week: cn('mt-2 flex w-full', defaultClassNames.week),
                week_number_header: cn('w-(--cell-size) select-none', defaultClassNames.week_number_header),
                week_number: cn('text-[0.8rem] text-muted-foreground select-none', defaultClassNames.week_number),
                day: cn(
                    'group/day relative aspect-square h-full w-full p-0 text-center select-none',
                    defaultClassNames.day,
                ),
                range_start: cn(
                    'relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted',
                    defaultClassNames.range_start,
                ),
                range_middle: cn('rounded-none', defaultClassNames.range_middle),
                range_end: cn(
                    'relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted',
                    defaultClassNames.range_end,
                ),
                today: cn('data-[selected=true]:rounded-none', defaultClassNames.today),
                outside: cn('text-muted-foreground aria-selected:text-muted-foreground', defaultClassNames.outside),
                disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
                hidden: cn('invisible', defaultClassNames.hidden),
            }}
            components={{
                Root: ({ className, rootRef, ...props }) => {
                    return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
                },
                Chevron: ({ className, orientation, ...props }) => {
                    if (orientation === 'left') {
                        return <ChevronLeft className={cn('cn-rtl-flip size-4', className)} {...props} />;
                    }
                    if (orientation === 'right') {
                        return <ChevronRight className={cn('cn-rtl-flip size-4', className)} {...props} />;
                    }
                    return <ChevronDown className={cn('size-4', className)} {...props} />;
                },
                DayButton: CalendarDayButton,
                WeekNumber: ({ children, ...props }) => {
                    return (
                        <td {...props}>
                            <div className="flex size-(--cell-size) items-center justify-center text-center">
                                {children}
                            </div>
                        </td>
                    );
                },
            }}
        />
    );
}

function CalendarDayButton({ day, modifiers, className, color, ...props }: ComponentProps<typeof DayButton>) {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);

    return (
        <Button
            ref={ref}
            type="button"
            size="icon"
            variant="ghost"
            color="secondary"
            className={cn(
                modifiers.today && 'bg-muted',
                modifiers.outside && 'opacity-40',
                modifiers.disabled && 'cursor-not-allowed opacity-30',
                modifiers.selected && 'bg-teal-900! text-white! hover:bg-teal-800!',
                className,
            )}
            {...props}
        />
    );
}
