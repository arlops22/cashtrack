import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ComponentProps,
    type CSSProperties,
} from 'react';

import { useIsMobile } from '../hooks/useIsMobile';
import { cn } from '../utils/cn';

const STORAGE_KEY = 'sidebar:open';
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

interface SidebarContextProps {
    state: 'expanded' | 'collapsed';
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export function SidebarProvider({
    defaultOpen = true,
    open: openProp,
    className,
    style,
    children,
    ...props
}: ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
}) {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = useState(false);
    const [_open, _setOpen] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved === null ? defaultOpen : saved === 'true';
        } catch {
            return defaultOpen;
        }
    });

    const open = openProp ?? _open;

    const setOpen = useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const openState = typeof value === 'function' ? value(open) : value;
            _setOpen(openState);

            try {
                localStorage.setItem(STORAGE_KEY, String(openState));
            } catch {}
        },
        [open, _setOpen],
    );

    const toggleSidebar = useCallback(() => {
        return isMobile ? setOpenMobile(open => !open) : setOpen(oldState => !oldState);
    }, [isMobile, setOpen, setOpenMobile]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggleSidebar();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? 'expanded' : 'collapsed';
    const contextValue = useMemo<SidebarContextProps>(
        () => ({
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
        }),
        [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
    );
    return (
        <SidebarContext value={contextValue}>
            <div
                data-slot="sidebar-wrapper"
                style={
                    {
                        '--sidebar-width': SIDEBAR_WIDTH,
                        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                        ...style,
                    } as CSSProperties
                }
                className={cn(
                    'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </SidebarContext>
    );
}
