import { use } from 'react';
import { CategoryContext } from '.';

export function useCategory() {
    const context = use(CategoryContext);
    if (!context) throw new Error('useCategory must be used within an CategoryProvider');
    return context;
}
