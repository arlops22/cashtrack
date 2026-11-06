import { CategoryProvider } from './components/CategoryContext';

import CategoryDataTable from './components/CategoryDataTable';
import CategoryModal from './components/modals/CategoryModal';
import DeleteCategoryModal from './components/modals/DeleteCategoryModal';
import CategoryHeader from './components/CategoryHeader';

export default function Categories() {
    return (
        <CategoryProvider>
            <CategoryHeader />
            <div className="flex flex-1 flex-col p-4">
                <CategoryDataTable />
            </div>

            <CategoryModal />
            <DeleteCategoryModal />
        </CategoryProvider>
    );
}
