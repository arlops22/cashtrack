// components/Chart/ChartTooltipContent.tsx
import type { ReactNode } from 'react';

import { cn } from '../../../../app/utils';
import { useChart } from './useChart';

type TooltipEntry = {
    name?: string | number;
    value?: number | string | Array<number | string>;
    color?: string;
    dataKey?: string | number;
    type?: string;
    payload?: { fill?: string };
};

type Props = {
    active?: boolean;
    payload?: TooltipEntry[];
    label?: string | number;
    labelFormatter?: (label: string | number) => ReactNode;
    valueFormatter?: (value: number) => string;
    hideLabel?: boolean;
    className?: string;
};

export function ChartTooltipContent({
    active,
    payload,
    label,
    labelFormatter,
    valueFormatter = value => value.toLocaleString(),
    hideLabel = false,
    className,
}: Props) {
    const { config } = useChart();

    if (!active || !payload?.length) return null;

    const headerLabel = typeof label === 'string' ? (config[label]?.label ?? label) : label;

    return (
        <div
            className={cn(
                'min-w-32 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs shadow-xl',
                className,
            )}
        >
            {!hideLabel && headerLabel !== undefined && (
                <div className="mb-1.5 font-medium text-gray-900">
                    {labelFormatter ? labelFormatter(headerLabel) : headerLabel}
                </div>
            )}

            <div className="grid gap-1.5">
                {payload
                    .filter(item => item.type !== 'none')
                    .map((item, index) => {
                        const key = String(item.dataKey ?? item.name);
                        const itemConfig = config[key];

                        const color = itemConfig?.color ?? item.payload?.fill ?? item.color;
                        const text = itemConfig?.label ?? item.name;

                        return (
                            <div key={key ?? index} className="flex items-center gap-2">
                                <span className="size-2.5 shrink-0 rounded-xs" style={{ backgroundColor: color }} />
                                <span className="flex-1 text-gray-500">{text}</span>
                                {typeof item.value === 'number' && (
                                    <span className="font-mono font-medium text-gray-900 tabular-nums">
                                        {valueFormatter(item.value)}
                                    </span>
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
