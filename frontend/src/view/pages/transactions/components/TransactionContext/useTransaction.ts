import { use } from 'react';

import { TransactionContext } from '.';

export function useTransaction() {
    const context = use(TransactionContext);
    if (!context) throw new Error('useTransaction must be used within an TransactionProvider');
    return context;
}
