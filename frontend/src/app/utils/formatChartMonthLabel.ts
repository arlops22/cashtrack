import { MONTHS } from '../config/constants';

export const formatChartMonthLabel = (month: string) => {
    const [year, monthIndex] = month.split('-');

    return `${MONTHS[Number(monthIndex) - 1]}/${year}`;
};
