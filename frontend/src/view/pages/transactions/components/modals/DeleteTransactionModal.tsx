import { useTransaction } from '../TransactionContext/useTransaction';

import ConfirmModal from '../../../../components/ConfirmModal';

export default function DeleteTransactionModal() {
    const { modal, onCloseModal, onDeleteTransaction, isLoadingDelete } = useTransaction();

    return (
        <ConfirmModal
            isOpen={modal.type === 'delete'}
            onClose={onCloseModal}
            onConfirm={onDeleteTransaction}
            isLoading={isLoadingDelete}
            title={`Are you sure that you want to delete ${modal.transaction?.name} transaction?`}
        />
    );
}
