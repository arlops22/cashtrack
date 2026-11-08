import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '../../../app/utils/cn';

export function Avatar({
    className,
    size = 'default',
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
    size?: 'default' | 'sm' | 'lg';
}) {
    return (
        <AvatarPrimitive.Root
            data-slot="avatar"
            data-size={size}
            className={cn(
                'group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full data-[size=lg]:size-12 data-[size=sm]:size-6',
                className,
            )}
            {...props}
        />
    );
}

export function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
    return (
        <AvatarPrimitive.Image
            data-slot="avatar-image"
            className={cn('aspect-square size-full rounded-full object-cover', className)}
            {...props}
        />
    );
}

export function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
    return (
        <AvatarPrimitive.Fallback
            data-slot="avatar-fallback"
            className={cn(
                'flex size-full items-center justify-center rounded-full bg-teal-0 text-sm text-primary group-data-[size=sm]/avatar:text-xs',
                className,
            )}
            {...props}
        />
    );
}
