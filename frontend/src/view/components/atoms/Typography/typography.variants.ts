import { cva, type VariantProps } from 'class-variance-authority';

export const typographyVariants = cva('', {
    variants: {
        variant: {
            h1: 'text-h1 font-bold',
            h2: 'text-h2 font-bold',
            h3: 'text-h3 font-bold',
            h4: 'text-h4 font-bold',
            h5: 'text-h5 font-bold',
            h6: 'text-h6 font-bold',
            subtitle: 'text-subtitle font-bold',
            'label-lg': 'text-label-lg font-medium',
            'label-md': 'text-label-md font-medium',
            'label-sm': 'text-label-sm font-medium',
            'body-lg': 'text-body-lg',
            'body-md': 'text-body-md',
            'body-sm': 'text-body-sm',
            caption: 'text-caption',
        },
        color: {
            default: 'text-foreground',
            muted: 'text-muted-foreground',
            primary: 'text-primary',
            destructive: 'text-destructive',
            success: 'text-success',
            warning: 'text-warning',
            info: 'text-info',

            black: 'text-black',
            white: 'text-white',
            'gray-100': 'text-gray-100',
            'gray-200': 'text-gray-200',
            'gray-300': 'text-gray-300',
            'gray-400': 'text-gray-400',
            'gray-500': 'text-gray-500',
            'gray-600': 'text-gray-600',
            'gray-700': 'text-gray-700',
            'gray-800': 'text-gray-800',
            'gray-900': 'text-gray-900',
            'primary-l': 'text-primary-l',
            'primary-m': 'text-primary-m',
            'primary-d': 'text-primary-d',
            'secondary-l': 'text-secondary-l',
            'secondary-m': 'text-secondary-m',
            'secondary-d': 'text-secondary-d',
            'error-l': 'text-error-l',
            'error-m': 'text-error-m',
            'success-l': 'text-success-l',
            'success-m': 'text-success-m',
            'warning-l': 'text-warning-l',
            'warning-m': 'text-warning-m',
        },
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
        },
        overflow: {
            true: 'truncate',
            false: '',
        },
    },
    defaultVariants: {
        variant: 'body-md',
        color: 'default',
        align: 'left',
        overflow: false,
    },
});

type Variants = VariantProps<typeof typographyVariants>;

export type TypographyVariant = NonNullable<Variants['variant']>;
export type TypographyColor = NonNullable<Variants['color']>;
export type TypographyAlign = NonNullable<Variants['align']>;
