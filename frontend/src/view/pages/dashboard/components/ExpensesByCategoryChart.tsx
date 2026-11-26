import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from 'recharts';
import { useTranslation } from 'react-i18next';

import type { ByCategorySummary } from '../../../../app/services/transactionsService/metrics';
import { formatChartMonthLabel, formatCurrency } from '../../../../app/utils';

import {
    ChartContainer,
    ChartLegendContent,
    ChartTooltipContent,
    type ChartConfig,
} from '../../../components/ui/chart';
import Typography from '../../../components/Typography';

type ChartRow = { month: string } & Record<string, string | number>;

type TProps = {
    data: ByCategorySummary[];
};

function buildChart(data: ByCategorySummary[]) {
    const config: ChartConfig = {};
    const rows = new Map<string, ChartRow>();

    for (const { month, categoryId, categoryName, totalAmount, categoryColor } of data) {
        const key = `category-${categoryId}`;

        config[key] ??= { label: categoryName, color: categoryColor };

        const row = rows.get(month) ?? { month };
        row[key] = totalAmount;
        rows.set(month, row);
    }

    const chartData = [...rows.values()].sort((a, b) => a.month.localeCompare(b.month));

    return { chartData, chartConfig: config, categoryKeys: Object.keys(config) };
}

export default function ExpensesByCategoryChart({ data }: TProps) {
    const { t } = useTranslation();
    const { chartData, chartConfig, categoryKeys } = useMemo(() => buildChart(data), [data]);

    return (
        <div className="h-fit w-full bg-white border rounded-md p-4">
            <Typography variant="body-lg" color="gray-800" className="font-medium mb-4">
                {t('dashboard.charts.expensesByCategory')}
            </Typography>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tickFormatter={formatChartMonthLabel}
                    />
                    <Tooltip
                        content={
                            <ChartTooltipContent
                                valueFormatter={formatCurrency}
                                labelFormatter={label => formatChartMonthLabel(String(label))}
                            />
                        }
                    />
                    <Legend content={<ChartLegendContent />} />
                    {categoryKeys.map((key, index) => (
                        <Bar
                            key={key}
                            dataKey={key}
                            stackId="expenses"
                            fill={`var(--color-${key})`}
                            radius={index === categoryKeys.length - 1 ? [4, 4, 0, 0] : 0}
                        />
                    ))}
                </BarChart>
            </ChartContainer>
        </div>
    );
}
