import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
    'relative align-middle flex items-center justify-center gap-3 cursor-pointer focus:outline-none transition ease-in-out duration-100',
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
                ghost: '',
            },
            size: {
                sm: 'px-2 text-label-sm h-6 rounded-[3px]',
                md: 'px-4 text-label-lg h-10 rounded-md',
                lg: 'px-8 text-label-lg h-12 rounded-lg',
                'icon-sm': 'aspect-square w-6 px-0! rounded-full! [&>svg]:size-3',
                icon: 'aspect-square w-8 px-0! rounded-full! [&>svg]:size-4',
                'icon-lg': 'aspect-square w-12 px-0! rounded-full! [&>svg]:size-6',
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
                class: 'bg-primary text-white hover:bg-primary-hover',
            },
            {
                color: 'primary',
                variant: 'ghost',
                disabled: false,
                class: 'bg-transparent text-white hover:bg-teal-100',
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
                class: 'bg-secondary text-white hover:bg-secondary-hover',
            },
            {
                color: 'secondary',
                variant: 'ghost',
                disabled: false,
                class: 'bg-transparent text-gray-900 hover:bg-gray-100',
            },
            {
                color: 'secondary',
                variant: 'outlined',
                disabled: false,
                class: 'border border-solid bg-transparent border-secondary text-secondary hover:bg-gray-0',
            },
            {
                color: 'error',
                variant: 'contained',
                disabled: false,
                class: 'bg-destructive text-white hover:bg-red-800',
            },
            {
                color: 'error',
                variant: 'ghost',
                disabled: false,
                class: 'bg-transparent text-red-800 hover:bg-red-100',
            },
            {
                color: 'error',
                variant: 'outlined',
                disabled: false,
                class: 'border border-solid bg-transparent border-destructive text-destructive hover:bg-destructive/12',
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

export type Variants = VariantProps<typeof buttonVariants>;
