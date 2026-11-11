import { cva, type VariantProps } from 'class-variance-authority';

export const modalVariants = cva(
    'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    {
        variants: {
            size: {
                sm: 'sm:max-w-sm',
                md: 'sm:max-w-md',
                lg: 'sm:max-w-lg',
            },
        },
        defaultVariants: {
            size: 'sm',
        },
    },
);

export type Variants = VariantProps<typeof modalVariants>;
