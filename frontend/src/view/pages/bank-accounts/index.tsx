import { BankAccountProvider } from './components/BankAccountContext';

import BankAccountHeader from './components/BankAccountHeader';
import BankAccountModal from './components/modals/BankAccountModal';
import DeleteAccountModal from './components/modals/DeleteAccountModal';
import BankAccountList from './components/BankAccountList';

export default function BankAccounts() {
    return (
        <BankAccountProvider>
            <BankAccountHeader />
            <div className="flex flex-1 flex-col p-4">
                <BankAccountList />
            </div>

            <BankAccountModal />
            <DeleteAccountModal />
        </BankAccountProvider>
    );
}
