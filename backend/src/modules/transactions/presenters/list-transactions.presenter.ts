import { Transaction } from '../../../shared/entities';

interface TransactionsGroupedByDate {
    date: string;
    transactions: Transaction[];
}

export const presentTransactionsByDate = (transactions: Transaction[]) => {
    const map = new Map<string, TransactionsGroupedByDate>();

    for (const row of transactions) {
        const key = row.createdAt.toISOString().slice(0, 10);
        const entry = map.get(key) ?? { date: key, transactions: [] };

        entry.transactions.push(row);

        map.set(key, entry);
    }

    return Array.from(map.values());
};
