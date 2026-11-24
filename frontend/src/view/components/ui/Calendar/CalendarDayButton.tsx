import { useEffect, useRef, type ComponentProps } from 'react';
import type { DayButton } from 'react-day-picker';

import { cn } from '../../../../app/utils';

import Button from '../../Button';

export function CalendarDayButton({ day, modifiers, className, color, ...props }: ComponentProps<typeof DayButton>) {
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
                modifiers.selected && !modifiers.range_middle && 'bg-teal-900! text-white! hover:bg-teal-800!',
                modifiers.range_middle && 'bg-transparent! font-semibold text-foreground! hover:bg-teal-100!',
                className,
            )}
            {...props}
        />
    );
}
