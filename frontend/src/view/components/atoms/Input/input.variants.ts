import { cva } from 'class-variance-authority';

export const inputVariants = cva(
    'w-full h-10 border rounded-lg px-4 py-3 text-body-lg transition duration-200 outline-none ' +
        'placeholder:text-body-lg placeholder:text-gray-300 placeholder:font-normal',
    {
        variants: {
            invalid: {
                true: 'border-primary-d',
                false: 'border-gray-100',
            },
            disabled: {
                true: 'cursor-not-allowed bg-stroke-low text-stroke-high',
                false: 'bg-white text-paragraph-high',
            },
            hasLeftIcon: { true: 'pl-10', false: '' },
            multiline: { true: 'min-h-[130px]', false: '' },
        },
        defaultVariants: {
            invalid: false,
            disabled: false,
            hasLeftIcon: false,
            multiline: false,
        },
    },
);

export const labelVariants = cva('text-body-lg font-medium mb-2', {
    variants: {
        invalid: { true: 'text-primary-d', false: 'text-paragraph-medium' },
    },
    defaultVariants: { invalid: false },
});

export const supportTextVariants = cva('text-caption ml-2 mt-1', {
    variants: {
        invalid: { true: 'text-primary-d', false: 'text-gray-700' },
    },
    defaultVariants: { invalid: false },
});

export const rightIconVariants = cva('absolute right-3 bottom-2 transition hover:opacity-70', {
    variants: {
        clickable: { true: 'cursor-pointer', false: 'cursor-default' },
    },
    defaultVariants: { clickable: false },
});

export const wrapperClass = 'flex flex-col-reverse relative';
export const leftIconClass = 'absolute left-3 bottom-3';
