import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from 'recharts';

import type { MonthlySummary } from '../../../../app/services/transactionsService/metrics';
import { formatCurrency, formatChartMonthLabel } from '../../../../app/utils';

import {
    ChartContainer,
    ChartLegendContent,
    ChartTooltipContent,
    type ChartConfig,
} from '../../../components/ui/chart';
import Typography from '../../../components/Typography';

const chartConfig = {
    income: { label: 'Income', color: 'var(--color-teal-500)' },
    expense: { label: 'Expense', color: 'var(--color-red-500)' },
    balance: { label: 'Total Net Income', color: 'var(--color-warning-l)' },
} satisfies ChartConfig;

type TProps = {
    data: MonthlySummary[];
};

export default function ExpensesChart({ data }: TProps) {
    return (
        <div className="h-96 w-full bg-white border rounded-md p-4">
            <Typography variant="body-lg" color="gray-800" className="font-medium mb-4">
                Metrics by month
            </Typography>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={data}>
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
                    <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                    <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
                    <Bar dataKey="balance" fill="var(--color-balance)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
