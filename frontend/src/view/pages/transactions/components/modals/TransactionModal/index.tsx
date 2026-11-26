import { useTranslation } from 'react-i18next';

import { useTransaction } from '../../TransactionContext/useTransaction';

import Modal from '../../../../../components/Modal';
import TransactionForm from '../../TransactionForm';

export default function TransactionModal() {
    const { t } = useTranslation();
    const { modal, onCloseModal } = useTransaction();

    return (
        <Modal
            open={modal.type === 'create' || modal.type === 'edit'}
            onClose={onCloseModal}
            title={modal.transaction ? t('transactions.modal.editTitle') : t('transactions.modal.createTitle')}
            size="lg"
            key={modal.transaction?.id ?? 'new'}
        >
            <TransactionForm
                key={modal.transaction?.id ?? 'new'}
                transaction={modal.transaction}
                onSuccess={onCloseModal}
            />
        </Modal>
    );
}
