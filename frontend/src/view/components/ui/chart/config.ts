export type ChartConfig = Record<
    string,
    {
        label?: string;
        icon?: React.ComponentType;
    } & ({ color?: string } | { color?: never })
>;
