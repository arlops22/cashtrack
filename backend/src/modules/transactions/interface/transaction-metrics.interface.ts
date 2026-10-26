export interface TransactionTotals {
    totalIncome: number;
    totalExpense: number;
}

export interface CategoryMonthSummary {
    categoryId: number | null;
    categoryName: string;
    totalAmount: number;
    month: Date;
}

export interface MonthlyIncomeExpense {
    month: Date;
    totalIncome: number;
    totalExpense: number;
    periodBalance: number;
}
