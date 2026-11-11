import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import moment from 'moment';

import { cn } from '../../app/utils';

import { DatePicker } from './DatePicker';

type TProps = {
    value?: Date;
    onChange: (date?: Date) => void;
    error?: string;
    className?: string;
};

export default function DatePickerField(props: TProps) {
    const { value, onChange, error, className } = props;

    const [open, setOpen] = useState(false);

    return (
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
            <PopoverPrimitive.Trigger asChild>
                <button
                    type="button"
                    className={cn(
                        'cursor-pointer bg-white w-full rounded-lg border border-gray-500 px-3 h-13 text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4',
                        error && 'border-destructive!',
                        className,
                    )}
                >
                    <div>
                        <span className="absolute text-gray-700 text-xs left-3.25 top-2 pointer-events-none">Date</span>
                        <span>{value ? moment(value).format('DD/MM/YYYY') : 'Select date'}</span>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <ChevronDown />
                    </div>
                </button>
            </PopoverPrimitive.Trigger>

            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    sideOffset={8}
                    align="start"
                    className="z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
                >
                    <DatePicker onChange={onChange} value={value ?? new Date()} />
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
}
