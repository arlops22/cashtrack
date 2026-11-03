import type { ComponentProps } from 'react';
import * as Slot from '@radix-ui/react-slot';

import { sidebarMenuButtonVariants, type Variants } from './menu-button.variants';
import { cn } from '../../../../app/utils/cn';

type TProps = ComponentProps<'button'> & {
    isActive?: boolean;
    asChild?: boolean;
    // tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & Variants;

export default function SidebarMenuButton(props: TProps) {
    const {
        isActive = false,
        asChild = false,
        variant = 'default',
        size = 'default',
        // tooltip,
        className,
        ...rest
    } = props;
    // const { isMobile, state } = useSidebar();
    const Comp = asChild ? Slot.Root : 'button';

    const button = (
        <Comp
            data-slot="sidebar-menu-button"
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive || undefined}
            className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
            {...rest}
        />
    );

    return button;

    // if (!tooltip) {
    //     return button;
    // }

    // if (typeof tooltip === 'string') {
    //     tooltip = {
    //         children: tooltip,
    //     };
    // }

    // return (
    //     <Tooltip>
    //         <TooltipTrigger asChild>{button}</TooltipTrigger>
    //         <TooltipContent side="right" align="center" hidden={state !== 'collapsed' || isMobile} {...tooltip} />
    //     </Tooltip>
    // );
}
