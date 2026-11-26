import { useTranslation } from 'react-i18next';

import { useTransaction } from '../TransactionContext/useTransaction';

import ConfirmModal from '../../../../components/ConfirmModal';

export default function DeleteTransactionModal() {
    const { t } = useTranslation();
    const { modal, onCloseModal, onDeleteTransaction, isLoadingDelete } = useTransaction();

    return (
        <ConfirmModal
            isOpen={modal.type === 'delete'}
            onClose={onCloseModal}
            onConfirm={onDeleteTransaction}
            isLoading={isLoadingDelete}
            title={t('transactions.delete.confirm').replace('{{name}}', modal.transaction?.name || '')}
        />
    );
}
