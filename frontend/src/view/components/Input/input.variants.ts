import { cva } from 'class-variance-authority';

export const inputVariants = cva(
    'peer w-full rounded-lg border text-body-lg outline-none transition-all ' + 'placeholder:text-transparent',
    {
        variants: {
            invalid: {
                true: 'border-primary-d',
                false: 'border-gray-500 focus:border-gray-800',
            },
            disabled: {
                true: 'cursor-not-allowed bg-gray-100 text-gray-500',
                false: 'bg-white text-gray-800',
            },
            hasLeftIcon: {
                true: 'pl-10 pr-4',
                false: 'px-4',
            },
            multiline: {
                false: 'h-[52px] pt-4 pb-1 placeholder-shown:py-0',
                true: 'min-h-[130px] pt-6 pb-2',
            },
        },
        defaultVariants: {
            invalid: false,
            disabled: false,
            hasLeftIcon: false,
            multiline: false,
        },
    },
);

export const labelVariants = cva(
    'pointer-events-none absolute top-2 text-label-sm transition-all ' + 'peer-placeholder-shown:text-body-lg',
    {
        variants: {
            invalid: {
                true: 'text-primary-d',
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
        invalid: { true: 'text-primary-d', false: 'text-gray-700' },
    },
    defaultVariants: { invalid: false },
});

export const rightIconVariants = cva(
    'w-7 h-7 flex items-center justify-center rounded-full bg-transparent absolute right-3 top-1/2 -translate-y-1/2 transition hover:bg-gray-100 duration-100',
    {
        variants: {
            clickable: { true: 'cursor-pointer', false: 'cursor-default' },
        },
        defaultVariants: { clickable: false },
    },
);

export const wrapperClass = 'flex flex-col-reverse relative';
export const leftIconClass = 'absolute left-3 bottom-3';
