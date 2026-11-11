import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '../../../app/utils/cn';

import Button from '../Button';
import Typography from '../Typography';
import { modalVariants, type Variants } from './modal.variants';

type TProps = Variants & {
    open: boolean;
    children: React.ReactNode;
    title: string;
    onClose?(): void;
};

export default function Modal(props: TProps) {
    const { open, title, onClose, children, size } = props;

    return (
        <DialogPrimitive.Root open={open} onOpenChange={onClose}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className={cn(
                        'fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
                    )}
                />

                <DialogPrimitive.Content className={modalVariants({ size })}>
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
