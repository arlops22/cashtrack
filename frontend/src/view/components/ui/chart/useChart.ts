import { use } from 'react';

import { ChartContext } from './container';

export function useChart() {
    const context = use(ChartContext);
    if (!context) {
        throw new Error('useChart must be used within a <ChartContainer />');
    }
    return context;
}
