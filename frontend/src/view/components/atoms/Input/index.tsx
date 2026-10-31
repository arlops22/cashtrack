import {
    forwardRef,
    useId,
    type ComponentPropsWithRef,
    type ElementType,
    type InputHTMLAttributes,
    type ReactNode,
} from 'react';

import { cn } from '../../../../app/utils/cn';
import {
    inputVariants,
    labelVariants,
    leftIconClass,
    rightIconVariants,
    supportTextVariants,
    wrapperClass,
} from './input.variants';
import { inputRegistry, type InputConfig, type InputType } from './input.registry';

interface IBaseProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    error?: string;
    supportText?: string;
    leftIconComponent?: ReactNode;
    rightIconComponent?: ReactNode;
    onRightIconClick?: () => void;
    rightIconLabel?: string;
    className?: string;
    inputClassName?: string;
}

type TInputProps = IBaseProps & {
    type?: Exclude<InputType, 'textarea'>;
} & Omit<ComponentPropsWithRef<'input'>, 'type' | 'className'>;

type TTextareaProps = IBaseProps & {
    type: 'textarea';
} & Omit<ComponentPropsWithRef<'textarea'>, 'type' | 'className'>;

export type IProps = TInputProps | TTextareaProps;

const Input = forwardRef<any, IProps>((props, ref) => {
    const {
        onRightIconClick,
        rightIconComponent,
        error,
        className,
        supportText,
        type = 'text',
        leftIconComponent,
        disabled,
        ...fieldProps
    } = props;

    const generatedId = useId();
    const id = fieldProps.id ?? fieldProps.name ?? generatedId;

    const config: InputConfig = inputRegistry[type];
    const Tag: ElementType = config.tag;

    const invalid = Boolean(error);
    const helperText = error ?? supportText;
    const helperId = `${id}-helper`;

    return (
        <div className={cn('w-full', className)}>
            <div className={wrapperClass}>
                {leftIconComponent && <div className={leftIconClass}>{leftIconComponent}</div>}

                <Tag
                    id={id}
                    ref={ref}
                    {...config.props}
                    {...fieldProps}
                    type={config.htmlType}
                    aria-invalid={invalid || undefined}
                    aria-describedby={helperText ? helperId : undefined}
                    className={cn(
                        inputVariants({
                            invalid,
                            disabled,
                            hasLeftIcon: leftIconComponent !== undefined,
                            multiline: type === 'textarea',
                        }),
                    )}
                />

                <label
                    className={cn(
                        labelVariants({
                            invalid,
                            hasLeftIcon: leftIconComponent !== undefined,
                            multiline: type === 'textarea',
                        }),
                    )}
                    htmlFor={fieldProps.name}
                >
                    {fieldProps.placeholder}
                </label>

                {rightIconComponent !== undefined && (
                    <button
                        type="button"
                        onClick={() => (onRightIconClick ? onRightIconClick() : null)}
                        className={cn(rightIconVariants({ clickable: onRightIconClick !== undefined }))}
                    >
                        {rightIconComponent}
                    </button>
                )}
            </div>

            {helperText && (
                <p id={helperId} role={invalid ? 'alert' : undefined} className={supportTextVariants({ invalid })}>
                    {helperText}
                </p>
            )}
        </div>
    );
});

export default Input;
