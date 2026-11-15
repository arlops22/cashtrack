import { Transaction } from '../../../shared/entities';

interface TransactionsGroupedByDate {
    date: string;
    dayBalance: number;
    transactions: Transaction[];
}

export const presentTransactionsByDate = (transactions: Transaction[]) => {
    const map = new Map<string, TransactionsGroupedByDate>();

    for (const row of transactions) {
        const key = row.createdAt.toISOString().slice(0, 10);
        const entry = map.get(key) ?? { date: key, transactions: [], dayBalance: 0 };

        entry.transactions.push(row);
        entry.dayBalance += row.type === 'EXPENSE' ? row.amount * -1 : row.amount;

        map.set(key, entry);
    }

    return Array.from(map.values());
};
