import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartContainer, type ChartConfig } from '../../../components/ui/chart';
import type { MonthlySummary } from '../../../../app/services/transactionsService/metrics';

const chartConfig = {
    income: { label: 'Income', color: 'var(--primary)' },
    expense: { label: 'Expense', color: 'var(--destructive)' },
    balance: { label: 'Total Net Income', color: 'var(--secondary)' },
} satisfies ChartConfig;

type TProps = {
    data: MonthlySummary[];
};

export default function ExpensesChart({ data }: TProps) {
    const chartData = useMemo(
        () =>
            data.map(({ month, summary }) => ({
                month,
                income: summary.totalIncome,
                expense: summary.totalExpense,
                balance: summary.periodBalance,
            })),
        [data],
    );

    return (
        <ChartContainer config={chartConfig} className="h-96 w-full bg-white border rounded-md p-4">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                {/* <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} /> */}
                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
                <Bar dataKey="balance" fill="var(--color-balance)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}
