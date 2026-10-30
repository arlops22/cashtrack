import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cn } from '../../../../app/utils/cn';

import {
    typographyVariants,
    type TypographyAlign,
    type TypographyColor,
    type TypographyVariant,
} from './typography.variants';

const defaultTag: Record<TypographyVariant, ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    'label-lg': 'span',
    'label-md': 'span',
    'label-sm': 'span',
    'body-lg': 'p',
    'body-md': 'p',
    'body-sm': 'p',
    subtitle: 'p',
    caption: 'span',
};

type TypographyProps<T extends ElementType> = {
    align?: TypographyAlign;
    variant?: TypographyVariant;
    color?: TypographyColor;
    children: ReactNode;
    className?: string;
    as?: T;
    overflow?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'color' | 'children' | 'className'>;

const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
    const { align, variant, color, overflow, as, className, children, ...rest } = props;

    const resolved = variant ?? 'body-md';
    const Component: ElementType = as ?? defaultTag[resolved];

    return (
        <Component className={cn(typographyVariants({ variant, color, align, overflow }), className)} {...rest}>
            {children}
        </Component>
    );
};

export default Typography;
