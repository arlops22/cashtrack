import { useId, type ComponentPropsWithRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '../../../app/utils/cn';
import { labelVariants, selectVariants, supportTextVariants } from './select.variants';

type TProps = ComponentPropsWithRef<'select'> & {
    className?: string;
    error?: string;
    supportText?: string;
    placeholder: string;
    options: {
        value: string | number;
        label: string;
    }[];
    value?: string;
    onChange: (value: string) => void;
};

export default function Select(props: TProps) {
    const { className, error, supportText, ref, disabled, options, onChange, value, ...fieldProps } = props;

    const generatedId = useId();
    const id = fieldProps.id ?? fieldProps.name ?? generatedId;

    const invalid = Boolean(error);
    const helperText = error ?? supportText;
    const helperId = `${id}-helper`;

    return (
        <div className={cn('w-full', className)}>
            <div className="flex flex-col-reverse relative">
                <SelectPrimitive.Root value={value} onValueChange={onChange}>
                    <SelectPrimitive.Trigger className={cn(selectVariants({ invalid }))}>
                        <SelectPrimitive.Value />

                        <SelectPrimitive.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
                            <ChevronDown className="text-gray-800" />
                        </SelectPrimitive.Icon>
                    </SelectPrimitive.Trigger>

                    <SelectPrimitive.Portal>
                        <SelectPrimitive.Content className="relative z-50 min-w-36 overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
                            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6.25 bg-white text-gray-800 cursor-default">
                                <ChevronUp />
                            </SelectPrimitive.ScrollUpButton>

                            <SelectPrimitive.Viewport className="p-2">
                                {options.map(option => (
                                    <SelectPrimitive.Item
                                        key={option.value}
                                        value={option.value.toString()}
                                        className="relative flex w-full cursor-pointer items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground"
                                    >
                                        <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                                    </SelectPrimitive.Item>
                                ))}
                            </SelectPrimitive.Viewport>

                            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6.25 bg-white text-gray-800 cursor-default">
                                <ChevronDown />
                            </SelectPrimitive.ScrollDownButton>
                        </SelectPrimitive.Content>
                    </SelectPrimitive.Portal>
                </SelectPrimitive.Root>

                <label
                    className={cn(
                        labelVariants({
                            invalid,
                        }),
                    )}
                    htmlFor={fieldProps.name}
                >
                    {fieldProps.placeholder}
                </label>
            </div>

            {helperText && (
                <p id={helperId} role={invalid ? 'alert' : undefined} className={supportTextVariants({ invalid })}>
                    {helperText}
                </p>
            )}
        </div>
    );
}
