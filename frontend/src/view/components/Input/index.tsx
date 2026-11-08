import { useId, useMemo, type ComponentPropsWithRef, type ReactNode, type Ref } from 'react';
import { useMask } from '@react-input/mask';
import { mergeRefs } from 'react-merge-refs';

import { cn } from '../../../app/utils/cn';
import {
    inputVariants,
    labelVariants,
    leftIconClass,
    rightIconVariants,
    supportTextVariants,
    wrapperClass,
} from './input.variants';
import Button from '../Button';

type TProps = ComponentPropsWithRef<'input'> & {
    error?: string;
    supportText?: string;
    leftIconComponent?: ReactNode;
    rightIconComponent?: ReactNode;
    onRightIconClick?: () => void;
    rightIconLabel?: string;
    className?: string;
    inputClassName?: string;
    mask?: string;
};

function Input(props: TProps) {
    const {
        onRightIconClick,
        rightIconComponent,
        error,
        className,
        supportText,
        leftIconComponent,
        disabled,
        mask,
        ref,
        ...fieldProps
    } = props;

    const maskRef = useMask({
        mask: mask ?? '',
        replacement: { _: /\d/ },
    });

    const mergedRef = useMemo(
        () => mergeRefs([ref as Ref<HTMLInputElement>, mask ? maskRef : undefined]),
        [ref, mask, maskRef],
    );

    const generatedId = useId();
    const id = fieldProps.id ?? fieldProps.name ?? generatedId;

    const invalid = Boolean(error);
    const helperText = error ?? supportText;
    const helperId = `${id}-helper`;

    return (
        <div className={cn('w-full', className)}>
            <div className={wrapperClass}>
                {leftIconComponent && <div className={leftIconClass}>{leftIconComponent}</div>}

                <input
                    id={id}
                    ref={mergedRef}
                    {...fieldProps}
                    aria-invalid={invalid || undefined}
                    aria-describedby={helperText ? helperId : undefined}
                    className={cn(
                        inputVariants({
                            invalid,
                            disabled,
                            hasLeftIcon: leftIconComponent !== undefined,
                        }),
                    )}
                />

                <label
                    className={cn(
                        labelVariants({
                            invalid,
                            hasLeftIcon: leftIconComponent !== undefined,
                        }),
                    )}
                    htmlFor={id}
                >
                    {fieldProps.placeholder}
                </label>

                {rightIconComponent !== undefined && (
                    <Button
                        size="icon"
                        variant="ghost"
                        color="secondary"
                        type="button"
                        onClick={() => (onRightIconClick ? onRightIconClick() : null)}
                        className={cn(rightIconVariants({ clickable: onRightIconClick !== undefined }))}
                    >
                        {rightIconComponent}
                    </Button>
                )}
            </div>

            {helperText && (
                <p id={helperId} role={invalid ? 'alert' : undefined} className={supportTextVariants({ invalid })}>
                    {helperText}
                </p>
            )}
        </div>
    );
}

export default Input;
