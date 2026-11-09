import type { Category } from './Category';

export interface Transaction {
    id: number;
    name: string;
    amount: number;
    createdAt: Date;
    isFavorite: boolean;
    type: 'INCOME' | 'EXPENSE';
    method: 'CREDIT' | 'DEBIT' | 'PIX' | 'CASH';
    category?: Category | null;
}
