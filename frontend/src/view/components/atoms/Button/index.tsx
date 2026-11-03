import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { cn } from '../../../../app/utils/cn';
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
    } = props;

    const button_props: ButtonHTMLAttributes<HTMLButtonElement> = {
        onClick,
        disabled: disabled || isLoading,
        type,
        className: cn(buttonVariants({ color, variant, size, loading: isLoading, disabled }), className),
    };

    return (
        <button {...button_props}>
            {isLoading && <Spinner color={variant === 'outlined' ? 'default' : 'white'} size={23} />}
            {children}
        </button>
    );
};

export default Button;
