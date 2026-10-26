import { CategoryMonthSummary, MonthlyIncomeExpense } from '../interface/transaction-metrics.interface';

interface CategoriesGroupedByMonth {
    month: string;
    categories: Omit<CategoryMonthSummary, 'month'>[];
}

export const presentCategoriesByMonth = (data: CategoryMonthSummary[]) => {
    const map = new Map<string, CategoriesGroupedByMonth>();

    for (const row of data) {
        const key = row.month.toISOString().slice(0, 7);
        const entry = map.get(key) ?? { month: key, categories: [] };

        entry.categories.push({
            categoryId: row.categoryId,
            categoryName: row.categoryName,
            totalAmount: row.totalAmount,
        });

        map.set(key, entry);
    }

    return Array.from(map.values());
};

export const presentIncomeExpenseByMonth = (data: MonthlyIncomeExpense[]) => {
    return data.map(row => ({
        month: row.month,
        summary: {
            totalIncome: row.totalIncome,
            totalExpense: row.totalExpense,
            periodBalance: row.periodBalance,
        },
    }));
};
