// components/Calendar/index.tsx
import type { ComponentProps } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { enUS, ptBR } from 'react-day-picker/locale';

import { cn } from '../../../../app/utils';
import { buttonVariants } from '../../Button/button.variants';

import { CalendarDayButton } from './CalendarDayButton';

const CALENDAR_LOCALES = { en: enUS, 'pt-BR': ptBR };

export const defaultClassNames = getDefaultClassNames();

const baseClassNames = {
    root: cn('w-full', defaultClassNames.root),
    months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
    month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
    nav: cn('absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1', defaultClassNames.nav),
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
    caption_label: cn('text-sm font-medium select-none', defaultClassNames.caption_label),
    month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
    weekdays: cn('flex', defaultClassNames.weekdays),
    weekday: cn('flex-1 text-[0.8rem] font-normal text-gray-500 select-none', defaultClassNames.weekday),
    week: cn('mt-2 flex w-full', defaultClassNames.week),
    day: cn('relative aspect-square h-full w-full p-0 text-center select-none', defaultClassNames.day),
    today: cn('data-[selected=true]:rounded-none', defaultClassNames.today),
    outside: cn('text-gray-500 aria-selected:text-gray-500', defaultClassNames.outside),
    disabled: cn('text-gray-500 opacity-50', defaultClassNames.disabled),
    hidden: cn('invisible', defaultClassNames.hidden),
};

const baseComponents = {
    Chevron: ({ className, orientation }: { className?: string; orientation?: string }) => {
        if (orientation === 'left') return <ChevronLeft className={cn('size-4', className)} />;
        if (orientation === 'right') return <ChevronRight className={cn('size-4', className)} />;
        return <ChevronDown className={cn('size-4', className)} />;
    },
    DayButton: CalendarDayButton,
};

type CalendarProps = ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, components, ...props }: CalendarProps) {
    const { i18n } = useTranslation();
    const locale = CALENDAR_LOCALES[i18n.resolvedLanguage as keyof typeof CALENDAR_LOCALES] ?? enUS;

    return (
        <DayPicker
            locale={locale}
            className={cn('p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)]', className)}
            classNames={{ ...baseClassNames, ...classNames }}
            components={{ ...baseComponents, ...components }}
            {...props}
        />
    );
}
