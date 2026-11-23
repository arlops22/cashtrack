export interface TransactionTotals {
    income: number;
    expense: number;
}

export interface CategoryMonthSummary {
    categoryId: number | null;
    categoryName: string;
    categoryColor: string;
    totalAmount: number;
    month: Date;
}

export interface MonthlyIncomeExpense {
    month: Date;
    income: number;
    expense: number;
    balance: number;
}
