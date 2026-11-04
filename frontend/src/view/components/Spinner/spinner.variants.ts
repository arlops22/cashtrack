import { cva, type VariantProps } from 'class-variance-authority';

export const spinnerWrapperVariants = cva('h-full flex items-center justify-center', {
    variants: {
        variant: {
            default: 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
            fixed: '',
            backgrounded: '',
            static: '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export const spinnerEffectsVariants = cva('rounded-full border-transparent border-solid box-border border-l-[3px]', {
    variants: {
        color: {
            primary: 'border-l-primary-m',
            default: 'border-l-secondary-m',
            white: 'border-l-white',
            danger: 'border-l-feedback-error-m',
        },
        effect: {
            first: 'absolute animate-rotate 1s',
            second: 'absolute animate-rotate-opacity-1',
            third: 'animate-rotate-opacity-2',
        },
        thickness: {
            thin: 'border-[3px] border-l-[3px]',
            thick: 'border-[6px] border-l-[6px]',
        },
    },
    defaultVariants: {
        thickness: 'thin',
        color: 'white',
        effect: 'first',
    },
});

type WrapperVariants = VariantProps<typeof spinnerWrapperVariants>;
type EffectsVariants = VariantProps<typeof spinnerEffectsVariants>;

export type SpinnerVariant = NonNullable<WrapperVariants['variant']>;
export type SpinnerColor = NonNullable<EffectsVariants['color']>;
export type SpinnerThickness = NonNullable<EffectsVariants['thickness']>;
