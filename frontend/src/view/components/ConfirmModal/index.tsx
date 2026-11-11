import { Trash } from 'lucide-react';

import Button from '../Button';
import Typography from '../Typography';
import Modal from '../Modal';

type TProps = {
    isOpen: boolean;
    onConfirm(): void;
    onClose(): void;
    title: string;
    description?: string;
    isLoading: boolean;
};

export default function ConfirmModal(props: TProps) {
    const { isOpen, onConfirm, onClose, title, description, isLoading } = props;

    return (
        <Modal open={isOpen} title="Delete" onClose={onClose}>
            <div className="flex flex-col items-center text-center gap-6">
                <div className="w-13 h-13 rounded-full bg-red-0 flex items-center justify-center">
                    <Trash className="w-6 h-6 text-red-900" />
                </div>

                <Typography className="text-center max-w-52 w-full" as="p" variant="label-lg">
                    {title}
                </Typography>

                {description && <p className="tracking-[-0.5px] text-gray-800">{description}</p>}
            </div>

            <div className="mt-10 space-y-4">
                <Button className="w-full" color="error" onClick={onConfirm} isLoading={isLoading}>
                    Yes
                </Button>

                <Button className="w-full" variant="outlined" color="secondary" onClick={onClose} disabled={isLoading}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}
