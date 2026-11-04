import type { ComponentProps } from 'react';
import * as Slot from '@radix-ui/react-slot';

import { useSidebar } from '../../../../../app/hooks/useSidebar';
import { sidebarMenuButtonVariants, type Variants } from './menu-button.variants';
import { cn } from '../../../../../app/utils/cn';

import { Tooltip, TooltipContent, TooltipTrigger } from '../../Tooltip';

type TProps = ComponentProps<'button'> & {
    isActive?: boolean;
    asChild?: boolean;
    tooltip?: string;
} & Variants;

export function SidebarMenuButton(props: TProps) {
    const { isActive = false, asChild = false, size = 'default', tooltip, className, ...rest } = props;
    const { isMobile, state } = useSidebar();

    const Comp = asChild ? Slot.Root : 'button';

    const button = (
        <Comp
            data-slot="sidebar-menu-button"
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive || undefined}
            className={cn(sidebarMenuButtonVariants({ size }), className)}
            {...rest}
        />
    );

    if (!tooltip) {
        return button;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side="right" align="center" hidden={state !== 'collapsed' || isMobile}>
                {tooltip}
            </TooltipContent>
        </Tooltip>
    );
}
