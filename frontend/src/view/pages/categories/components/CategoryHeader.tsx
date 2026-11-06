import { Plus } from 'lucide-react';

import { useCategory } from './CategoryContext/useCategory';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

export default function CategoryHeader() {
    const { onOpenCreateModal } = useCategory();

    return (
        <Header
            title="Categories"
            actionComponent={
                <Button onClick={onOpenCreateModal} size="md">
                    <Plus size={15} />
                    <span>Add category</span>
                </Button>
            }
        />
    );
}
