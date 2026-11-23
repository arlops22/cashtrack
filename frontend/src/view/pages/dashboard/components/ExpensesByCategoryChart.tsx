import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from 'recharts';

import { formatCurrency } from '../../../../app/utils';

import {
    ChartContainer,
    ChartLegendContent,
    ChartTooltipContent,
    type ChartConfig,
} from '../../../components/ui/chart';
import Typography from '../../../components/Typography';

type TProps = {
    config: ChartConfig;
    data: any;
};

export default function ExpensesByCategoryChart({ config, data }: TProps) {
    return (
        <div className="h-96 w-full bg-white border rounded-md p-4">
            <Typography variant="body-lg" color="gray-800" className="font-medium mb-4">
                Expenses by category
            </Typography>
            <ChartContainer config={config}>
                <BarChart accessibilityLayer data={data}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="key"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={value => value.slice(0, 3)}
                    />
                    <Tooltip content={<ChartTooltipContent valueFormatter={formatCurrency} />} />
                    <Legend content={<ChartLegendContent />} />
                    <Bar dataKey="income" stackId="category" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
