import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '../../../app/utils/cn';

import Button from '../Button';
import Typography from '../Typography';

type TProps = {
    open: boolean;
    children: React.ReactNode;
    title: string;
    onClose?(): void;
};

export function Modal(props: TProps) {
    const { open, title, onClose, children } = props;

    return (
        <DialogPrimitive.Root open={open} onOpenChange={onClose}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className={cn(
                        'fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
                    )}
                />

                <DialogPrimitive.Content
                    className={cn(
                        'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
                    )}
                >
                    <div className="flex justify-center pb-3">
                        <Button
                            className="absolute top-3 right-3"
                            variant="ghost"
                            color="secondary"
                            size="icon"
                            onClick={onClose}
                        >
                            <X className="w-6 h-6" />
                        </Button>

                        <Typography variant="body-lg" className="font-bold" as="p">
                            {title}
                        </Typography>
                    </div>

                    <div>{children}</div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
