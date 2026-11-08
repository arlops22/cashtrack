import { cva } from 'class-variance-authority';

export const selectVariants = cva(
    'cursor-pointer w-full rounded-lg border text-body-lg text-left h-[52px] p-4 pb-1 placeholder-shown:py-0 outline-none transition-all' +
        'placeholder:text-transparent',
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

export const labelVariants = cva(
    'pointer-events-none absolute top-2 text-label-sm transition-all ' + 'peer-placeholder-shown:text-body-lg',
    {
        variants: {
            invalid: {
                true: 'text-destructive',
                false: 'text-gray-700',
            },
            hasLeftIcon: {
                true: 'left-[37px]',
                false: 'left-4',
            },
            multiline: {
                false: 'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2',
                true: 'peer-placeholder-shown:top-6',
            },
        },
        defaultVariants: {
            invalid: false,
            hasLeftIcon: false,
            multiline: false,
        },
    },
);

export const supportTextVariants = cva('text-body-sm ml-2 mt-1', {
    variants: {
        invalid: { true: 'text-destructive', false: 'text-gray-700' },
    },
    defaultVariants: { invalid: false },
});
