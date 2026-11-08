import { useBankAccount } from '../BankAccountContext/useBankAccount';

import ConfirmModal from '../../../../components/ConfirmModal';

export default function DeleteAccountModal() {
    const { modal, onCloseModal, onDeleteAccount, isLoadingDelete } = useBankAccount();

    return (
        <ConfirmModal
            isOpen={modal.type === 'delete'}
            onClose={onCloseModal}
            onConfirm={onDeleteAccount}
            isLoading={isLoadingDelete}
            title={`Are you sure that you want to delete ${modal.account?.name} account?`}
        />
    );
}
