import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
    // base: sempre aplicada
    'relative align-middle flex items-center justify-center gap-3 focus:outline-none transition ease-in-out duration-300',
    {
        variants: {
            color: {
                primary: '',
                secondary: '',
                error: '',
            },
            variant: {
                contained: '',
                outlined: '',
            },
            size: {
                sm: 'px-2 text-label-sm h-6 rounded-[3px]',
                md: 'px-4 text-label-lg h-7.5 rounded-[3px]',
                lg: 'px-8 text-label-lg h-9 rounded',
            },
            loading: {
                true: 'text-transparent!',
                false: '',
            },
            disabled: {
                true: 'cursor-not-allowed',
                false: '',
            },
        },
        compoundVariants: [
            {
                color: 'primary',
                variant: 'outlined',
                disabled: false,
                class: 'border bg-transparent border-teal-900 text-teal-900 hover:bg-teal-900/12',
            },
            {
                color: 'secondary',
                variant: 'outlined',
                disabled: false,
                class: 'border border-solid bg-transparent border-secondary-m text-secondary-m hover:bg-secondary-m/12',
            },
            {
                color: 'error',
                variant: 'outlined',
                disabled: false,
                class: 'border border-solid bg-transparent border-error-m text-error-m hover:bg-error-m/12',
            },

            {
                color: 'primary',
                variant: 'contained',
                disabled: false,
                class: 'border bg-teal-900 text-white border-teal-900 hover:shadow-md hover:shadow-teal-900/40',
            },
            {
                color: 'secondary',
                variant: 'contained',
                disabled: false,
                class: 'border bg-secondary-m text-white border-secondary-m hover:shadow-md hover:shadow-secondary-m/40',
            },
            {
                color: 'error',
                variant: 'contained',
                disabled: false,
                class: 'border bg-error-m text-white border-error-m hover:shadow-md hover:shadow-error-m/40',
            },

            {
                variant: 'outlined',
                disabled: true,
                class: 'border bg-transparent border-gray-400 text-gray-400',
            },
            {
                variant: 'contained',
                disabled: true,
                class: 'bg-gray-300 text-gray-800 opacity-70',
            },
        ],
        defaultVariants: {
            color: 'primary',
            variant: 'contained',
            size: 'md',
            loading: false,
            disabled: false,
        },
    },
);

type Variants = VariantProps<typeof buttonVariants>;

export type ButtonColor = NonNullable<Variants['color']>;
export type ButtonVariant = NonNullable<Variants['variant']>;
export type ButtonSize = NonNullable<Variants['size']>;
