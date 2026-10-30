import { forwardRef, type InputHTMLAttributes, type ReactElement } from 'react';

import { cn } from '../../../../app/utils/cn';
import {
    inputVariants,
    labelVariants,
    leftIconClass,
    rightIconVariants,
    supportTextVariants,
    wrapperClass,
} from './input.variants';

interface IProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    type: 'text' | 'number' | 'e-mail' | 'password' | 'textarea' | 'date' | 'time';
    rightBtnAction?: () => void;
    rightIconComponent?: ReactElement;
    leftIconComponent?: ReactElement;
    className?: string;
    supportText?: string;
    error?: Partial<Record<keyof IProps['name'], { message: string }>>;
}

const Input = forwardRef<any, IProps>((props, ref) => {
    const {
        rightBtnAction,
        rightIconComponent,
        error,
        className,
        supportText,
        label,
        type,
        leftIconComponent,
        disabled,
        ...fieldProps
    } = props;

    const input_props = {
        ...fieldProps,
        ref,
        type,
        disabled,
        className: cn(
            inputVariants({
                invalid: error !== undefined,
                disabled,
                hasLeftIcon: leftIconComponent !== undefined,
                multiline: type === 'textarea',
            }),
            className,
        ),
    };

    const inputs: any = {
        textarea: {
            tag: 'textarea',
            input_props: {
                ...input_props,
                rows: 4,
            },
        },
        text: {
            tag: 'input',
            input_props,
        },
        number: {
            tag: 'input',
            input_props,
        },
        'e-mail': {
            tag: 'input',
            input_props,
        },
        password: {
            tag: 'input',
            input_props,
        },
        date: {
            tag: 'input',
            input_props,
        },
        time: {
            tag: 'input',
            input_props,
        },
    };

    const InputTag = inputs[type].tag;
    const input_tag_props = inputs[type].input_props;

    return (
        <div className={cn('w-full', className)}>
            <div className={wrapperClass}>
                {leftIconComponent && <div className={leftIconClass}>{leftIconComponent}</div>}

                <InputTag id={fieldProps.name} {...input_tag_props} />

                {rightIconComponent !== undefined && (
                    <button
                        type="button"
                        onClick={() => (rightBtnAction ? rightBtnAction() : null)}
                        className={cn(rightIconVariants({ clickable: rightBtnAction !== undefined }))}
                    >
                        {rightIconComponent}
                    </button>
                )}

                {label && (
                    <label className={cn(labelVariants({ invalid: error !== undefined }))} htmlFor={fieldProps.name}>
                        {label}
                    </label>
                )}
            </div>

            {supportText && <p className={cn(supportTextVariants({ invalid: error !== undefined }))}>{supportText}</p>}
        </div>
    );
});

export default Input;
