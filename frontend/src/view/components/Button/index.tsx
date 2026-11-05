import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import * as Slot from '@radix-ui/react-slot';

import { cn } from '../../../app/utils/cn';
import { buttonVariants, type Variants } from './button.variants';

import Spinner from '../Spinner';

type TProps = {
    onClick?: MouseEventHandler;
    children?: ReactNode | ReactNode[];
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    isLoading?: boolean;
    maxWidth?: string;
    asChild?: boolean;
} & Variants;

const Button = (props: TProps) => {
    const {
        children,
        onClick,
        className,
        color = 'primary',
        size = 'lg',
        variant = 'contained',
        disabled,
        type = 'button',
        isLoading = false,
        asChild = false,
    } = props;

    const Comp = asChild ? Slot.Root : 'button';

    const button_props: ButtonHTMLAttributes<HTMLButtonElement> = {
        onClick,
        disabled: disabled || isLoading,
        type,
        className: cn(buttonVariants({ color, variant, size, loading: isLoading, disabled }), className),
    };

    return (
        <Comp {...button_props}>
            {isLoading && <Spinner color={variant === 'outlined' ? 'default' : 'white'} size={23} />}
            {children}
        </Comp>
    );
};

export default Button;
