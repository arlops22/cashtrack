import { cva, type VariantProps } from 'class-variance-authority';

export const spinnerVariants = cva('', {
    variants: {
        variant: {
            default: 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
            fixed: '',
            backgrounded: '',
            static: '',
        },
        color: {
            primary: 'border-l-primary-m',
            default: 'border-l-secondary-m',
            white: 'border-l-white',
            danger: 'border-l-feedback-error-m',
        },
    },
    defaultVariants: {
        variant: 'default',
        color: 'white',
    },
});

type Variants = VariantProps<typeof spinnerVariants>;

export type SpinnerColor = NonNullable<Variants['color']>;
export type SpinnerVariant = NonNullable<Variants['variant']>;
