import type { Transaction } from '../../../../app/entities/Transaction';
import { cn } from '../../../../app/utils/cn';
import { MONTHS } from '../../../../app/config/constants';
import { useTransaction } from './TransactionContext/useTransaction';

import { Carousel } from '../../../components/ui/Carousel';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

export default function TransactionsFilters() {
    const { accounts, filters, setFilters } = useTransaction();

    return (
        <>
            <div className="flex items-center gap-4 mb-8">
                <Select
                    className="max-w-60 w-full"
                    placeholder="Account:"
                    value={filters.account}
                    onChange={value => setFilters(oldState => ({ ...oldState, account: value.toString() }))}
                    options={accounts.map(account => ({
                        value: account.id.toString(),
                        label: account.name,
                    }))}
                />
                <Select
                    className="max-w-60 w-full"
                    placeholder="Type:"
                    value={filters.type}
                    onChange={value =>
                        setFilters(oldState => ({ ...oldState, type: value as Transaction['type'] | 'All' }))
                    }
                    options={[
                        { value: 'All', label: 'All transactions' },
                        { value: 'INCOME', label: 'Incomes' },
                        { value: 'EXPENSE', label: 'Expenses' },
                    ]}
                />
            </div>
            <Carousel className="mb-8" selectedIndex={filters.month}>
                {MONTHS.map((month, index) => (
                    <div
                        role="group"
                        aria-roledescription="slide"
                        data-slot="carousel-item"
                        className="min-w-0 shrink-0 grow-0 basis-1/5 pl-4"
                        key={`month-${index}`}
                    >
                        <Button
                            onClick={() => setFilters(oldState => ({ ...oldState, month: MONTHS.indexOf(month) }))}
                            className={cn(
                                MONTHS[filters.month] === month ? 'bg-primary text-white' : '',
                                'max-w-40 w-full transition-all cursor-pointer',
                            )}
                            disabled={MONTHS[filters.month] === month}
                            size="md"
                            variant="ghost"
                            color="secondary"
                        >
                            {month}
                        </Button>
                    </div>
                ))}
            </Carousel>
        </>
    );
}
