import { cva } from 'class-variance-authority';

export const selectVariants = cva(
    'cursor-pointer w-full rounded-lg border text-body-lg text-left h-[52px] p-4 pb-1 placeholder-shown:py-0 outline-none transition-all',
    {
        variants: {
            invalid: {
                true: 'border-destructive',
                false: 'border-gray-500 focus:border-gray-800',
            },
            disabled: {
                true: 'cursor-not-allowed bg-gray-100 text-gray-500',
                false: 'bg-white text-gray-800',
            },
        },
        defaultVariants: {
            invalid: false,
            disabled: false,
        },
    },
);

export const labelVariants = cva('pointer-events-none absolute z-10 transition-all', {
    variants: {
        selected: {
            true: 'text-label-sm left-[13px] top-2 translate-y-0',
            false: 'text-label-lg top-1/2 -translate-y-1/2 left-3',
        },
        invalid: {
            true: 'text-destructive',
            false: 'text-gray-700',
        },
        hasLeftIcon: {
            true: 'left-[37px]',
            false: 'left-4',
        },
    },
    defaultVariants: {
        selected: false,
        invalid: false,
        hasLeftIcon: false,
    },
});

export const supportTextVariants = cva('text-body-sm ml-2 mt-1', {
    variants: {
        invalid: { true: 'text-destructive', false: 'text-gray-700' },
    },
    defaultVariants: { invalid: false },
});
