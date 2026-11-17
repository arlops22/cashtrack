import { cn } from '../../../../app/utils';
import { useChart } from './useChart';

type LegendEntry = {
    value?: string | number;
    dataKey?: string | number;
    color?: string;
    type?: string;
};

type Props = {
    payload?: LegendEntry[];
    verticalAlign?: 'top' | 'middle' | 'bottom';
    className?: string;
};

export function ChartLegendContent({ payload, verticalAlign = 'bottom', className }: Props) {
    const { config } = useChart();

    if (!payload?.length) return null;

    return (
        <div
            className={cn(
                'flex flex-wrap items-center justify-center gap-4',
                verticalAlign === 'top' ? 'pb-3' : 'pt-3',
                className,
            )}
        >
            {payload
                .filter(item => item.type !== 'none')
                .map((item, index) => {
                    const key = String(item.dataKey ?? item.value);
                    const itemConfig = config[key];

                    return (
                        <div key={key ?? index} className="flex items-center gap-1.5 text-xs text-gray-600">
                            <span
                                className="size-2 shrink-0 rounded-xs"
                                style={{ backgroundColor: itemConfig?.color ?? item.color }}
                            />
                            {itemConfig?.label ?? item.value}
                        </div>
                    );
                })}
        </div>
    );
}
