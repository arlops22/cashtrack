import { useSidebar } from '../../../../app/hooks/useSidebar';
import { cn } from '../../../../app/utils/cn';

export function Sidebar({
    side = 'left',
    collapsible = 'icon',
    className,
    children,
    dir,
    ...props
}: React.ComponentProps<'div'> & {
    side?: 'left' | 'right';
    collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
    const { isMobile, state } = useSidebar();
    if (collapsible === 'none') {
        return (
            <div
                data-slot="sidebar"
                className={cn('flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
    if (isMobile) {
        return (
            <div></div>
            // <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
            //     <SheetContent
            //         dir={dir}
            //         data-sidebar="sidebar"
            //         data-slot="sidebar"
            //         data-mobile="true"
            //         className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            //         style={
            //             {
            //                 '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            //             } as React.CSSProperties
            //         }
            //         side={side}
            //     >
            //         <SheetHeader className="sr-only">
            //             <SheetTitle>Sidebar</SheetTitle>
            //             <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            //         </SheetHeader>
            //         <div className="flex h-full w-full flex-col">{children}</div>
            //     </SheetContent>
            // </Sheet>
        );
    }
    return (
        <div
            className="group peer hidden text-sidebar-foreground md:block"
            data-state={state}
            data-collapsible={state === 'collapsed' ? collapsible : ''}
            data-side={side}
            data-slot="sidebar"
        >
            <div
                data-slot="sidebar-gap"
                className={cn(
                    'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
                    'group-data-[collapsible=offcanvas]:w-0',
                    'group-data-[side=right]:rotate-180',
                    'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
                )}
            />
            <div
                data-slot="sidebar-container"
                data-side={side}
                className={cn(
                    'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex',
                    'border-sidebar-border group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
                    className,
                )}
                {...props}
            >
                <div
                    data-sidebar="sidebar"
                    data-slot="sidebar-inner"
                    className="flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="sidebar-header"
            data-sidebar="header"
            className={cn('flex flex-col gap-2 p-2', className)}
            {...props}
        />
    );
}

export function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="sidebar-footer"
            data-sidebar="footer"
            className={cn('flex flex-col gap-2 p-2', className)}
            {...props}
        />
    );
}

export function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="sidebar-content"
            data-sidebar="content"
            className={cn(
                'no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
                className,
            )}
            {...props}
        />
    );
}

export function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="sidebar-group"
            data-sidebar="group"
            className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
            {...props}
        />
    );
}

export function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
    return (
        <ul
            data-slot="sidebar-menu"
            data-sidebar="menu"
            className={cn('flex w-full min-w-0 flex-col gap-1', className)}
            {...props}
        />
    );
}

export function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
    return (
        <li
            data-slot="sidebar-menu-item"
            data-sidebar="menu-item"
            className={cn('group/menu-item relative', className)}
            {...props}
        />
    );
}
