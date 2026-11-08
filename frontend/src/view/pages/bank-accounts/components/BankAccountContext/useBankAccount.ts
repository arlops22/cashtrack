import { use } from 'react';

import { BankAccountContext } from '.';

export function useBankAccount() {
    const context = use(BankAccountContext);
    if (!context) throw new Error('useBankAccount must be used within an BankAccountProvider');
    return context;
}
