import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
    'relative align-middle flex items-center justify-center gap-3 cursor-pointer focus:outline-none transition ease-in-out duration-100',
    {
        variants: {
            color: {
                primary: '',
                secondary: '',
                ghost: '',
                error: '',
            },
            variant: {
                contained: '',
                outlined: '',
                icon: '',
            },
            size: {
                sm: 'px-2 text-label-sm h-6 rounded-[3px]',
                md: 'px-4 text-label-lg h-8 rounded-lg',
                lg: 'px-8 text-label-lg h-12 rounded-lg',
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
                variant: 'contained',
                disabled: false,
                class: 'bg-primary text-white hover:bg-teal-800',
            },
            {
                color: 'primary',
                variant: 'icon',
                disabled: false,
                class: 'bg-primary text-white hover:bg-teal-800',
            },
            {
                color: 'primary',
                variant: 'outlined',
                disabled: false,
                class: 'border bg-transparent border-primary text-primary hover:bg-primary/12',
            },
            {
                color: 'secondary',
                variant: 'contained',
                disabled: false,
                class: 'border bg-secondary-m text-white border-secondary-m hover:shadow-md hover:shadow-secondary-m/40',
            },
            {
                color: 'secondary',
                variant: 'icon',
                disabled: false,
                class: 'border bg-secondary-m text-white border-secondary-m hover:shadow-md hover:shadow-secondary-m/40',
            },
            {
                color: 'secondary',
                variant: 'outlined',
                disabled: false,
                class: 'border border-solid bg-transparent border-secondary-m text-secondary-m hover:bg-secondary-m/12',
            },
            {
                color: 'ghost',
                variant: 'contained',
                disabled: false,
                class: 'bg-transparent text-gray-900 hover:bg-gray-100',
            },
            {
                color: 'ghost',
                variant: 'icon',
                disabled: false,
                class: 'bg-transparent text-gray-900 hover:bg-gray-100',
            },
            {
                color: 'ghost',
                variant: 'outlined',
                disabled: false,
                class: 'border bg-transparent border-primary text-primary hover:bg-primary/12',
            },
            {
                color: 'error',
                variant: 'contained',
                disabled: false,
                class: 'border bg-error-m text-white border-error-m hover:shadow-md hover:shadow-error-m/40',
            },
            {
                color: 'error',
                variant: 'icon',
                disabled: false,
                class: 'border bg-error-m text-white border-error-m hover:shadow-md hover:shadow-error-m/40',
            },
            {
                color: 'error',
                variant: 'outlined',
                disabled: false,
                class: 'border border-solid bg-transparent border-error-m text-error-m hover:bg-error-m/12',
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
            { variant: 'icon', size: 'sm', class: 'w-6 px-0! rounded-full! [&>svg]:size-3' },
            { variant: 'icon', size: 'md', class: 'w-8 px-0! rounded-full! [&>svg]:size-4' },
            { variant: 'icon', size: 'lg', class: 'w-12 px-0! rounded-full! [&>svg]:size-6' },
            { variant: 'icon', disabled: true, class: 'bg-transparent text-gray-400' },
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

export type Variants = VariantProps<typeof buttonVariants>;
